export interface PickerComponentProps<V extends PickerValue> {

  title: string;

  icon?: string;

  value: V;

  items: PickerItem<V>[];

  onChange: (v: V) => void;

}

export type PickerValue = string | number;

export interface PickerItem<V extends PickerValue> {

  label: string;

  value: V;

}
