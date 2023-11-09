import { useStore } from 'effector-react';
import { BackPanel } from '@sber-universe/om-component-library';
import { $navigationInfo, $navigationInfoVisibility } from '@src/app/model';

export const NavPanel = (): JSX.Element => {
  const { to, label } = useStore($navigationInfo);
  const isVisible = useStore($navigationInfoVisibility);

  return (
    <>
      {isVisible && (
        <div className="w-full bg-black">
          <BackPanel to={to} label={label} classname=" container" />
        </div>
      )}
    </>
  );
};
