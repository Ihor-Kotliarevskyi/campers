'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Icon from '@/components/Icon/Icon';
import styles from './FiltersPanel.module.css';

const FORM_OPTIONS = [
  { value: 'alcove',          label: 'Alcove' },
  { value: 'panelTruck',      label: 'Panel Van' },
  { value: 'fullyIntegrated', label: 'Integrated' },
  { value: 'semiIntegrated',  label: 'Semi Integrated' },
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

export default function FiltersPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location,     setLocation]     = useState(searchParams.get('location')     ?? '');
  const [form,         setForm]         = useState(searchParams.get('form')         ?? '');
  const [engine,       setEngine]       = useState(searchParams.get('engine')       ?? '');
  const [transmission, setTransmission] = useState(searchParams.get('transmission') ?? '');

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
    <aside className={styles.panel}>
      <div className={styles.locationGroup}>
        <label className={styles.label}>Location</label>
        <div className={styles.inputWrapper}>
          <Icon id="map" size={20} color="var(--color-text-secondary)" />
          <input
            type="text"
            placeholder="City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>

      <h2 className={styles.filtersHeading}>Filters</h2>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Camper form</legend>
        {FORM_OPTIONS.map((opt) => (
          <label key={opt.value} className={styles.radioLabel}>
            <input
              type="radio"
              name="form"
              value={opt.value}
              checked={form === opt.value}
              onChange={() => setForm(opt.value)}
              className={styles.radioInput}
            />
            {opt.label}
          </label>
        ))}
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Engine</legend>
        {ENGINE_OPTIONS.map((opt) => (
          <label key={opt.value} className={styles.radioLabel}>
            <input
              type="radio"
              name="engine"
              value={opt.value}
              checked={engine === opt.value}
              onChange={() => setEngine(opt.value)}
              className={styles.radioInput}
            />
            {opt.label}
          </label>
        ))}
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Transmission</legend>
        {TRANSMISSION_OPTIONS.map((opt) => (
          <label key={opt.value} className={styles.radioLabel}>
            <input
              type="radio"
              name="transmission"
              value={opt.value}
              checked={transmission === opt.value}
              onChange={() => setTransmission(opt.value)}
              className={styles.radioInput}
            />
            {opt.label}
          </label>
        ))}
      </fieldset>

      <div className={styles.actions}>
        <button onClick={handleSearch} className={styles.searchBtn}>
          Search
        </button>
        {hasActiveFilters && (
          <button onClick={handleClear} className={styles.clearBtn}>
            <Icon id="close" size={16} />
            Clear filters
          </button>
        )}
      </div>
    </aside>
  );
}
