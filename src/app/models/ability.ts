export interface Ability {
  effect_changes: any[];
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: Generation;
  id: number;
  is_main_series: boolean;
  name: string;
  names: Name[];
  pokemon: Pokemon[];
}

interface EffectEntry {
  effect: string;
  language: Generation;
  short_effect: string;
}

interface Generation {
  name: string;
  url: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: Generation;
  version_group: Generation;
}

interface Name {
  language: Generation;
  name: string;
}

interface Pokemon {
  is_hidden: boolean;
  pokemon: Generation;
  slot: number;
}
