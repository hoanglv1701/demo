import { Form, Radio as RadioBs, RadioProps } from 'antd';
import { Rule } from 'antd/es/form';
import { NamePath } from 'antd/es/form/interface';
import { FormItemProps } from 'antd/lib';
import groupClassNames from 'classnames';
import Label from '../Label';
import { useControllableValue } from '@/hooks';
import { generateRequiredRules } from '@/utilities/form/rules/common';
import { omitNil } from '@/utilities/object';

export type InputValueType = string | number | readonly string[] | undefined;
export interface RadioBaseProps extends Omit<RadioProps, 'name'> {
  width?: number | string;
  label?: string;
  name: string;
  required?: boolean;
  initialValue?: string;
  rules?: Rule[];
  validateTrigger?: string | string[] | false;
  validateDebounce?: number;
  validateFirst?: boolean | 'parallel';
  dependencies?: NamePath[];
  restField?: FormItemProps;
  capitalize?: boolean;
  options: any[];
}
export const Radio: React.FC<RadioBaseProps> = ({
  width = '100%',
  label,
  name,
  required = false,
  rules,
  initialValue,
  validateTrigger,
  validateDebounce,
  validateFirst = true,
  dependencies,
  restField,
  className,
  value,
  options,
  onChange,
  ...rest
}) => {
  const [, setState] = useControllableValue<RadioProps['value']>(omitNil({ onChange }));
  return (
    <Form.Item
      validateTrigger={validateTrigger}
      validateDebounce={validateDebounce}
      name={name}
      rules={generateRequiredRules(required, rules)}
      className='m-0'
      initialValue={initialValue}
      validateFirst={validateFirst}
      dependencies={dependencies}
      {...restField}
    >
      <RadioBs.Group
        style={{ width: width }}
        className={groupClassNames('gt-input', className)}
        type='text'
        value={value}
        options={options}
        onChange={setState}
        {...rest}
      />
    </Form.Item>
  );
};
