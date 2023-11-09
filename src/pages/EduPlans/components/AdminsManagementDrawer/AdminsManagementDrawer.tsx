import { useAdminsPermissions } from '@src/pages/EduPlans/model/hooks';
import { Drawer, LoadingWrapper, Portal } from '@sber-universe/om-component-library';
import {
  $adminsDrawerIsVisible,
  admins,
  initialAvailableToLinkAdmins,
  linkAdmins,
  linkAdminsCloseConfirm,
  setAdminsDrawerVisibility,
} from '@src/pages/EduPlans/model';
import { useStore } from 'effector-react';
import React, { useEffect, useMemo } from 'react';
import { Formik } from 'formik';
import { FormContent } from '@src/pages/EduPlans/components/AdminsManagementDrawer/FormContent';
import { defaultPaginationValue } from '@constants/pagination';
import { useConfirmCallbackWrapped } from '@utils/hooks';

const useInitData = (planId: string) => {
  const currentAdmins = useStore(admins.$value);

  return useMemo(() => ({ planId, checkedUsers: currentAdmins.map((e) => e.id) }), [currentAdmins, planId]);
};

type AdminsManagementDrawerProps = {
  planId: string;
  portalId: string;
};
export const AdminsManagementDrawer = ({ planId, portalId }: AdminsManagementDrawerProps) => {
  const FOOTER_PORTAL_ID = 'footer_portal';
  const { isEditable } = useAdminsPermissions();
  const initData = useInitData(planId);
  const status = useStore(initialAvailableToLinkAdmins.$status);
  const drawerIsVisible = useStore($adminsDrawerIsVisible);

  useEffect(() => {
    if (drawerIsVisible)
      initialAvailableToLinkAdmins.get({
        planId,
        teachers: [],
        pagination: defaultPaginationValue,
      });
  }, [drawerIsVisible, planId]);

  const onClose = () => {
    setAdminsDrawerVisibility(false);
  };

  const onCloseWrapper = useConfirmCallbackWrapped({ callback: onClose, nodes: linkAdminsCloseConfirm });

  if (!isEditable || !drawerIsVisible) return null;

  return (
    <Portal portalId={portalId}>
      <Drawer
        isOpen={drawerIsVisible}
        onClose={onCloseWrapper}
        containerClassname="w-full !max-w-[1100px]"
        portalId={FOOTER_PORTAL_ID}
      >
        <Drawer.Header title="Администраторы плана обучения" onClose={onCloseWrapper} />
        <Drawer.Content>
          <Formik<{ checkedUsers: string[]; planId: string }> initialValues={initData} onSubmit={linkAdmins.add}>
            <LoadingWrapper loadingStatusList={[status]} errorStatusList={[status]}>
              <FormContent portalId={FOOTER_PORTAL_ID} onClose={onCloseWrapper} />
            </LoadingWrapper>
          </Formik>
        </Drawer.Content>
      </Drawer>
    </Portal>
  );
};
