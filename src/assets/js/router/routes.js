import { categoria } from '../controllers/categoriaController'
import { home } from '../controllers/homeController'
import { producto } from '../controllers/productoController'
import { register } from '../controllers/registerController'
import { login } from '../controllers/loginController'
import { search } from '../controllers/searchController'
import { account } from '../controllers/accountController'

export const routes = [
  {
    path: '',
    action: () => home(),
  },
  {
    path: 'search',
    action: () => search(),
  },
  {
    path: 'register',
    action: () => register(),
  },
  {
    path: 'login',
    action: () => login(),
  },
  {
    path: 'account',
    action: () => account(),
  },
  {
    path: 'productos',
    children: [
      'procesadores',
      'motherboards',
      'memorias-ram',
      'almacenamiento',
      'placas-de-video',
      'fuentes',
      'gabinetes',
      'refrigeracion',
    ].map(categoryName => ({
      path: categoryName,
      action: () => categoria(),
      children: [
        {
          pathParamName: 'productSlug',
          isDynamicParam: true,
          action: () => producto(),
        },
      ],
    })),
  },
]
