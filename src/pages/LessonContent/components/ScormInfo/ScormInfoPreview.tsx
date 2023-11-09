import { Content } from '@src/pages/LessonContent/model/types';
import { ScormPlayer } from '@sber-universe/om-component-library';
import { $scormPeviewIsActive, setScormPeviewIsActiveValue } from '@src/pages/LessonContent/model';
import { useStore } from 'effector-react';
import { Modal } from '@kit-edu/modal';

type ScormInfoPreviewProps = {
  scorm: Content;
};
export const ScormInfoPreview = ({ scorm }: ScormInfoPreviewProps): JSX.Element => {
  const scormPreviewIsActive = useStore($scormPeviewIsActive);

  const { fileName, entryPoint, apiVersion } = scorm;

  return (
    <>
      <div id="scorm-preview-container" />
      <Modal
        open={scormPreviewIsActive}
        portalId="scorm-preview-container"
        onClose={() => setScormPeviewIsActiveValue(false)}
      >
        <div className="block w-screen max-w-4xl h-[60vh] ">
          <ScormPlayer
            data={{
              id: fileName,
              initData: {},
              url: `/s3-bucket/${entryPoint}`,
              apiVersion,
            }}
            onScormSave={() => {}}
            onScormError={() => {}}
          />
        </div>
      </Modal>
    </>
  );
};
