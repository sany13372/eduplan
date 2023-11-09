import {useParams} from "react-router-dom";
import {EduPlanParams} from "@src/types";
import {useEffect} from "react";
import {resetDomain, eduPlanData, tenantsRoles} from "@src/hooks/isPossibleCreateStudent/model";
import {useStore} from "effector-react";
import './model/init';

export const useIsPossibleCreateStudent = () => {
  const { planId } = useParams<EduPlanParams>();
  const tenantRoles = useStore(tenantsRoles.$value);

  useEffect(() => {
    eduPlanData.get(planId);

    return () => resetDomain();
  }, [])

  return tenantRoles.includes('student');
}