'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Icon from '@/components/Icon/Icon';

const FORM_OPTIONS = [
  { value: 'alcove',          label: 'Alcove' },
  { value: 'panel_van',       label: 'Panel Van' },
  { value: 'integrated',      label: 'Integrated' },
  { value: 'semi_integrated', label: 'Semi Integrated' },
];

const ENGINE_OPTIONS = [
  { value: 'diesel',   label: 'Diesel' },
  { value: 'petrol',   label: 'Petrol' },
  { value: 'hybrid',   label: 'Hybrid' },
  { value: 'electric', label: 'Electric' },
];

const TRANSMISSION_OPTIONS = [
  { value: 'automatic', label: 'Automatic' },
  { value: 'manual',    label: 'Manual' },
];

const FILTER_GROUPS = [
  { name: 'form',         legend: 'Camper form',  options: FORM_OPTIONS },
  { name: 'engine',       legend: 'Engine',        options: ENGINE_OPTIONS },
  { name: 'transmission', legend: 'Transmission',  options: TRANSMISSION_OPTIONS },
] as const;

export default function FiltersPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location,     setLocation]     = useState(searchParams.get('location')     ?? '');
  const [form,         setForm]         = useState(searchParams.get('form')         ?? '');
  const [engine,       setEngine]       = useState(searchParams.get('engine')       ?? '');
  const [transmission, setTransmission] = useState(searchParams.get('transmission') ?? '');

  const state: Record<string, string> = { form, engine, transmission };
  const setters: Record<string, (v: string) => void> = {
    form: setForm,
    engine: setEngine,
    transmission: setTransmission,
  };

  const hasActiveFilters = !!(location || form || engine || transmission);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location)     params.set('location',     location);
    if (form)         params.set('form',         form);
    if (engine)       params.set('engine',       engine);
    if (transmission) params.set('transmission', transmission);
    router.push(`/catalog${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const handleClear = () => {
    setLocation('');
    setForm('');
    setEngine('');
    setTransmission('');
    router.push('/catalog');
  };

  return (
    <aside className="w-[260px] shrink-0 flex flex-col">
      <div className="flex flex-col gap-2 mb-8">
        <label className="text-sm text-text-secondary font-medium">Location</label>
        <div className="flex items-center gap-2 bg-white rounded-xl px-[18px] py-[14px] border border-border">
          <Icon id="map" size={20} color="var(--color-text-secondary)" />
          <input
            type="text"
            placeholder="City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-none outline-none text-base text-text-main bg-transparent w-full placeholder:text-text-secondary"
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-text-main m-0 mb-6">Filters</h2>

      {FILTER_GROUPS.map(({ name, legend, options }) => (
        <fieldset key={name} className="border-none p-0 m-0 mb-6">
          <legend className="text-sm text-text-secondary font-medium mb-3 p-0">{legend}</legend>
          {options.map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 text-base text-text-main cursor-pointer py-[6px]">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={state[name] === opt.value}
                onChange={() => setters[name](opt.value)}
                className="w-5 h-5 [accent-color:var(--color-primary)] cursor-pointer shrink-0"
              />
              {opt.label}
            </label>
          ))}
        </fieldset>
      ))}

      <div className="flex flex-col gap-4 mt-2">
        <button
          onClick={handleSearch}
          className="w-full py-4 bg-primary text-white border-none rounded-full text-base font-medium cursor-pointer transition-colors hover:bg-primary-hover"
        >
          Search
        </button>
        {hasActiveFilters && (
          <button
            onClick={handleClear}
            className="w-full py-4 bg-transparent text-text-main border border-text-main rounded-full text-base font-medium cursor-pointer flex items-center justify-center gap-2 transition-opacity hover:opacity-70"
          >
            <Icon id="close" size={16} />
            Clear filters
          </button>
        )}
      </div>
    </aside>
  );
}
