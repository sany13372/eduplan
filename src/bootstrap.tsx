import { FC } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { useInitPandora } from '@baldrick/pandora-box';
import { loadStoresData } from '@sber-universe/om-pandora';
import App from '@src/app';

/**
 * This component only works in *start:bootstrap-independent* mode
 */
const Bootstrap: FC = () => {
  const { loading } = useInitPandora({ getData: loadStoresData });

  return <BrowserRouter>{loading ? 'Loading...' : <App />}</BrowserRouter>;
};

ReactDOM.render(<Bootstrap />, document.getElementById('root'));
