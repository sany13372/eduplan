import { $selectedEduGridElement, resetDomainData, resetItemId, setItemId } from '@src/pages/ActivityList/model';

$selectedEduGridElement.on(setItemId, (_, val) => val).reset([resetDomainData, resetItemId]);
