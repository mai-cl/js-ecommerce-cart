import { categoria } from './controllers/categoriaController'
import { home } from './controllers/homeController'
import { producto } from './controllers/productoController'
import { search } from './controllers/searchController'

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
