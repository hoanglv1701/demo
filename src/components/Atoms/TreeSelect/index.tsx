import React, { useState } from 'react';
import { Form, TreeSelect } from 'antd';
import { Rule } from 'antd/es/form';
import { AntTreeNode } from 'antd/lib/tree';
import Label from '../Label';
import './index.less';

interface Props {
  multiple?: boolean;
  options: any[];
  placeholder: string;
  apiUrl?: string;
  onChange: any;
  defaultValue?: any;
  label: string;
  required?: boolean;
  fieldNames?: any;
  showParentName?: boolean;
  rules?: Rule[];
  allowClear?: boolean;
  showCheckBox?: boolean;
}
const Treeselect: React.FC<Props> = (props) => {
  const { multiple, options, placeholder, onChange, defaultValue, label, required, showParentName, rules, allowClear, showCheckBox } = props;
  const [value, setValue] = useState<string | undefined>(defaultValue);
  const [newOptions, setNewOptions] = useState<AntTreeNode[]>(options);
  const [prefix, setPrefix] = useState<string>('');

  const handleSearch = async (searchValue: string) => {
    // search trong data có sẵn
    const filteredOptions: any[] = [];
    options.forEach((node) => {
      if (node.name.toLowerCase().includes(searchValue.toLowerCase())) {
        filteredOptions.push(node);
      } else {
        const filteredChildren = node.children?.filter((child: any) =>
          child.Name.toLowerCase().includes(searchValue.toLowerCase())
        );
        if (filteredChildren && filteredChildren.length > 0) {
          filteredOptions.push({ ...node, children: filteredChildren });
        }
      }
    });
    // search theo API nếu thư mục cây data nhiều.
    // const response = await getData(`${apiUrl}?search=${searchValue}`);
    setNewOptions(filteredOptions);
  };
  const findParentName = (value: string, nodes: any[], parentName = ''): string => {
    for (const node of nodes) {
      if (node.value === value) {
        return parentName ? `${parentName} > ` : '';
      }
      if (node.children.length > 0) {
        const result = findParentName(value, node.children, node.title);
        if (result) return result;
      }
    }
    return '';
  };
  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
    showParentName && setPrefix(findParentName(newValue as string, options, ''));
  };
  const hasValue = true;

  return (
    <Form.Item className='customer' name={name} rules={rules}>
      <Label name={`${name}`} label={label} active={hasValue} required={required}>
        <TreeSelect
          prefix={showParentName ? prefix : ''}
          style={{ width: '100%' }}
          multiple={multiple}
          value={defaultValue || value}
          onChange={handleChange}
          treeData={options || newOptions}
          showSearch
          onSearch={handleSearch}
          treeNodeFilterProp={'Name'}
          placeholder={placeholder}
          allowClear={allowClear}
          treeCheckable={showCheckBox}
        />
      </Label>
    </Form.Item>
  );
};

export default Treeselect;
