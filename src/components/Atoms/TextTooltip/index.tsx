import { TooltipProps, Typography } from 'antd';
import { EllipsisConfig } from 'antd/es/typography/Base';
import { TextProps } from 'antd/es/typography/Text';

interface Ellipsis extends Omit<EllipsisConfig, 'expandable' | 'rows' | 'onExpand'> {
  tooltip: TooltipProps;
}

export interface TextTooltipProps extends TextProps {
  ellipsis?: Ellipsis;
  noTitle?: boolean;
}

export const TextTooltip: React.FC<TextTooltipProps> = ({ children, ellipsis, title, noTitle = false, ...rest }) => {
  return (
    <Typography.Text
      ellipsis={{
        tooltip: {
          title: children,
          ...ellipsis?.tooltip
        },
        ...ellipsis
      }}
      title={noTitle ? '' : title}
      {...rest}
    >
      {children}
    </Typography.Text>
  );
};
