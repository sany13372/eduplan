import { connectAddActionNodes } from '@utils/effector';
import { convertCreateUpdateLessonSettingsError } from '@src/pages/Lessons/model/validation';
import { resolved } from '@src/gql-client';
import { resetDomain, saveSettings } from '@src/pages/Lessons/model';
import { createSettingsMutation, updateSettingsMutation } from '@src/pages/Lessons/model/init/queries';

connectAddActionNodes({
  nodes: saveSettings,
  handler: async (data) => {
    if (data.implId) {
      return resolved(() => updateSettingsMutation(data), { noCache: true });
    }
    return resolved(() => createSettingsMutation(data), { noCache: true });
  },
  convertErrors: convertCreateUpdateLessonSettingsError,
  resetOn: [resetDomain],
  resetErrorsOn: [resetDomain],
});
