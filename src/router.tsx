import { createBrowserRouter} from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { Products, action as UpdateAvailabilityAction, loader as porductsLoader } from './views/Products';
import { NewProduct, action as NewProducutAction } from './views/NewProduct';
import { EditProduct, loader as editProductLoader, action as editProductAction } from './views/EditProduct';
import { action as deleteProductAction } from './components/ProductDetails';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products/>,
        loader: porductsLoader,
        action: UpdateAvailabilityAction
      },
      {
        path: 'products/new',
        element: <NewProduct />,
        action: NewProducutAction
      },
      {
        path: 'products/:id/edit', //ROA Pattern - Resource Oriented design
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction
      },
      {
        path: 'products/:id/delete',
        action: deleteProductAction
      }
    ]
  }
]);