import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '~/styles/index.scss';
import { App } from './App';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}
