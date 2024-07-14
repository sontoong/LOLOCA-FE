import { useState } from "react";
import { InputNumber, InputNumberProps } from "antd";

type TCustomInputNumber = Omit<InputNumberProps<number>, "style"> & {
  unit?: string;
  pluralUnit?: string;
};

function CustomInputNumber({ unit, pluralUnit, ...props }: TCustomInputNumber) {
  const [value, setValue] = useState<number | null>(null);

  const handleChange = (value: number | null) => {
    setValue(value);
    if (props.onChange) {
      props.onChange(value);
    }
  };

  const getDisplayUnit = () => {
    if (value !== null && value > 1 && pluralUnit) {
      return pluralUnit;
    }
    return unit;
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <InputNumber
        className="w-full"
        min={0}
        changeOnWheel
        {...props}
        value={value}
        onChange={handleChange}
      />
      {unit && <span style={{ marginLeft: 8 }}>{getDisplayUnit()}</span>}
    </div>
  );
}

export default CustomInputNumber;
