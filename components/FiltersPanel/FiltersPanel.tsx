'use client';

import { useRef, useState } from 'react';
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

  const inputRef = useRef<HTMLInputElement>(null);
  const [isLocationFocused, setIsLocationFocused] = useState(false);

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
    <aside className="w-[360px] h-auto shrink-0 flex flex-col rounded-[20px] p-6 bg-[var(--inputs)]">
      <div className="flex flex-col gap-2">
        <label className="m-0 font-normal text-base leading-[1.5] text-[var(--gray)]">Location</label>
        <div
          className="w-auto h-[56px] rounded-[12px] flex items-center gap-2 bg-white border border-[var(--gray-light)] px-5 py-4 cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <g clipPath="url(#loc-clip)">
              <path fillRule="evenodd" clipRule="evenodd" d="M19.7712 0.141029C19.8428 0.199699 19.9005 0.273527 19.94 0.357185C19.9796 0.440842 20.0001 0.53224 20 0.624779V18.1248C19.9999 18.2692 19.9498 18.4092 19.8582 18.5208C19.7666 18.6325 19.6391 18.709 19.4975 18.7373L13.2475 19.9873C13.1666 20.0034 13.0834 20.0034 13.0025 19.9873L6.875 18.7623L0.7475 19.9873C0.656861 20.0054 0.563332 20.0032 0.473651 19.9808C0.38397 19.9584 0.30037 19.9164 0.228874 19.8578C0.157378 19.7993 0.0997667 19.7255 0.0601897 19.642C0.0206127 19.5585 5.58159e-05 19.4672 0 19.3748L0 1.87478C8.72276e-05 1.73035 0.0501951 1.5904 0.141804 1.47874C0.233413 1.36708 0.360869 1.29059 0.5025 1.26228L6.7525 0.0122789C6.83337 -0.00388454 6.91663 -0.00388454 6.9975 0.0122789L13.125 1.23728L19.2525 0.0122789C19.3431 -0.00595135 19.4366 -0.00385945 19.5263 0.0184039C19.616 0.0406672 19.6997 0.0825478 19.7712 0.141029ZM12.5 2.38728L7.5 1.38728V17.6123L12.5 18.6123V2.38728ZM13.75 18.6123L18.75 17.6123V1.38728L13.75 2.38728V18.6123ZM6.25 17.6123V1.38728L1.25 2.38728V18.6123L6.25 17.6123Z" fill={isLocationFocused ? '#101828' : '#6C717B'} />
            </g>
            <defs>
              <clipPath id="loc-clip">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setIsLocationFocused(true)}
            onBlur={() => setIsLocationFocused(false)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="border-none outline-none text-base text-[var(--main)] bg-transparent min-w-0 placeholder:text-[var(--gray)]"
          />
        </div>
      </div>

      <div className="mt-10 mb-auto w-[153px] flex flex-col">
        <h2 className="m-0 mb-6 text-[20px] font-semibold leading-[1.2] text-[var(--main)]">Filters</h2>

        <div className="flex flex-col gap-6">
          {FILTER_GROUPS.map(({ name, legend, options }) => (
            <fieldset key={name} className="border-none p-0 m-0">
              <legend className="p-0 m-0 font-normal text-base leading-[1.5] text-[var(--gray)]">{legend}</legend>
              <div className="flex flex-col gap-2 mt-2">
                {options.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 font-normal text-base leading-[1.5] text-[var(--main)] cursor-pointer">
                    <input
                      type="radio"
                      name={name}
                      value={opt.value}
                      checked={state[name] === opt.value}
                      onChange={() => setters[name](opt.value)}
                      className="sr-only"
                    />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                      <circle cx="12" cy="12" r="11.5" stroke={state[name] === opt.value ? 'var(--grey-green)' : '#475467'} />
                      {state[name] === opt.value && <circle cx="12" cy="12" r="6" fill="var(--grey-green)" />}
                    </svg>
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-12">
        <button
          onClick={handleSearch}
          className="w-[312px] h-[56px] rounded-[200px] py-4 px-[60px] bg-[var(--button)] text-white border-none outline-none font-medium text-base leading-[1.5] tracking-[-0.01em] cursor-pointer transition-colors hover:bg-[var(--button-hover)]"
        >
          Search
        </button>
        {hasActiveFilters && (
          <button
            onClick={handleClear}
            className="w-[312px] h-[56px] rounded-[200px] py-4 px-8 bg-white text-[var(--main)] border border-[var(--gray-light)] outline-none cursor-pointer flex items-center justify-center gap-2 text-base font-medium transition-opacity hover:opacity-70"
          >
            <Icon id="close" size={16} />
            Clear filters
          </button>
        )}
      </div>
    </aside>
  );
}
