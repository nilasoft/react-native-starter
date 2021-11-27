import {useState} from 'react';
import {Flag} from './flag.model';

export function useFlag(initial = false): Flag {

  const [state, set] = useState(initial);

  function toggle(): void {
    set(prev => !prev);
  }

  function down(): void {
    set(false);
  }

  function up(): void {
    set(true);
  }

  return {
    state,
    not: !state,
    set,
    toggle,
    down,
    up
  };

}
