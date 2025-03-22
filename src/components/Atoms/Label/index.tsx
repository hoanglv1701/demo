import React, { ReactNode, useState } from 'react';
import './style.less';

interface Props {
  children?: ReactNode;
  label: string;
  name?: string;
  active?: boolean;
  required?: boolean;
  className?: string;
}

const Label: React.FC<Props> = ({ children, label, active = false, required = false, name, className = '' }) => {
  const [focus, setFocus] = useState(false);

  const labelClass: string = focus || active ? 'gt-label gt-label-float' : 'gt-label';

  return (
    <div className={`gt-label-wrapper ${className}`} onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
      {label && (
        <label className={labelClass} title={label} htmlFor={name}>
          {label} {required && <span className='text-red-600'>*</span>}
        </label>
      )}
      {children}
    </div>
  );
};

export default Label;
