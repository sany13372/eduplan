import {
  $navigationInfo,
  $navigationInfoVisibility,
  resetNavigationInfo,
  setNavigationInfo,
  setNavigationInfoVisibility,
} from '@src/app/model';

$navigationInfo.on(setNavigationInfo, (_, value) => value).reset(resetNavigationInfo);
$navigationInfoVisibility.on(setNavigationInfoVisibility, (_, value) => value).reset(resetNavigationInfo);
