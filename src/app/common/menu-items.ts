import { MenuItem } from '../core/models/menu.model'


export const MENU_ITEMS: MenuItem[] = [
  {
    key: 'stock-interne',
    label: 'Stock Interne',
    isTitle: true,
  },
  {
    key: 'produit',
    icon: 'iconoir-view-grid',  
    label: 'Produit',
    collapsed: true,
    subMenu: [
      {
        key: 'produit-nouveau',
        label: 'Nouveau',
        url: 'dashboard/stock-interne/new',
        parentKey: 'nouveau',
      },
      {
        key: 'produit-saisie-multiple',
        label: 'Saisie multiple',
        url: 'dashboard/stock-interne/produit/saisie-multiple',
        parentKey: 'saisie-multiple',
      },
      {
        key: 'produit-liste',
        label: 'Liste',
        url: 'dashboard/stock-interne/produit/liste',
        parentKey: 'liste',
      },
      {
        key: 'produit-alert',
        label: 'Alerte Stock',
        url: 'dashboard/stock-interne/produit/alert',
        parentKey: 'alert',
      },
    ],
  },
  {
    key: 'mouvement-stockmouvement-stock',
    icon: 'iconoir-compact-disc',  
    label: 'Mouvement de stock',
    collapsed: true,
    subMenu: [
      {
        key: 'mouvement-stock-ravitaillement',
        label: 'Ravitaillement',
        url: 'dashboard/stock-interne/mouvement-stock/ravitaillement',
        parentKey: 'ravitaillement',
      },
      {
        key: 'mouvement-stock-inventaire',
        label: 'Inventaire',
        url: 'dashboard/stock-interne/mouvement-stock/inventaire',
        parentKey: 'inventaire',
      },
      {
        key: 'mouvement-stock-historique',
        label: 'Historique',
        url: 'dashboard/stock-interne/mouvement-stock/historique',
        parentKey: 'historique',
      },
    ],
  },
  {
    key: 'conf-init',
    icon: 'iconoir-settings',  
    label: 'Configuration initiale',
    collapsed: true,
    subMenu: [
      {
        key: 'conf-init-multi-entrepot',
        label: 'Multi-entrepots',
        url: 'dashboard/stock-interne/configuration-intiale/multi-entrepot',
        parentKey: 'multi-entrepot',
      },
      {
        key: 'conf-init-categorie',
        label: 'Categorie de produit',
        url: 'dashboard/stock-interne/configuration-intiale/categorie',
        parentKey: 'categorie',
      },
      {
        key: 'conf-init-unit-mesure',
        label: 'Unité de mésure',
        url: 'dashboard/stock-interne/configuration-intiale/unit-mesure',
        parentKey: 'unit-mesure',
      },
      {
        key: 'conf-init-type-produit',
        label: 'Type de produit',
        url: 'dashboard/stock-interne/configuration-intiale/type-produit',
        parentKey: 'type-produit',
      },
    ],
  },
  {
    key: 'stock-sortie',
    label: 'Sortie de stock',
    isTitle: true,
  },
  {
    key: 'mouvement-sortant',
    icon: 'iconoir-coins', 
    label: 'Mouvement sortant',
    collapsed: true,
    subMenu: [
      // {
      //   key: 'mouvement-sortant-carte-simple',
      //   label: 'Carte simple',
      //   url: 'dashboard/sortie-stock/mouvement-sortant/carte-simple',
      //   parentKey: 'carte-simple',
      // },
      // {
      //   key: 'mouvement-sortant-carte-credit',
      //   label: 'Carte de credit',
      //   url: 'dashboard/sortie-stock/mouvement-sortant/carte-credit',
      //   parentKey: 'carte-credit',
      // },
      {
        key: 'mouvement-sortant-panier',
        label: 'Panier',
        url: 'dashboard/sortie-stock/mouvement-sortant/carte-credit',
        parentKey: 'panier',
      },
      {
        key: 'mouvement-sortant-livraison',
        label: 'Livraison',
        url: 'dashboard/sortie-stock/mouvement-sortant/carte-livraison',
        parentKey: 'livraison',
      }
    ],
  },
  {
    key: 'commande',
    icon: 'iconoir-submit-document', 
    label: 'Commande',
    collapsed: true,
    subMenu: [
      {
        key: 'commande-simulation',
        label: 'Simulation',
        url: 'dashboard/sortie-stock/commande/simulation',
        parentKey: 'simulation',
      },
      {
        key: 'bon-commande',
        label: 'Bon de commande',
        url: 'dashboard/sortie-stock/commande/bondecommande',
        parentKey: 'bondecommande',
      },
    ]
  }
  // {
  //   key: 'panier',
  //   icon: 'iconoir-journal-page',
  //   label: 'Tri de panier',
  //   collapsed: true,
  //   subMenu: [
  //     {
  //       key: 'panier-creer',
  //       label: 'Creer',
  //       url: 'dashboard/sortie-stock/panier/creer',
  //       parentKey: 'creer',
  //     },
  //     {
  //       key: 'panier-reste',
  //       label: 'Reste à payer',
  //       url: 'dashboard/sortie-stock/panier/reste',
  //       parentKey: 'reste',
  //     },
  //     {
  //       key: 'panier-paye',
  //       label: 'Paye',
  //       url: 'dashboard/sortie-stock/panier/paye',
  //       parentKey: 'paye',
  //     },
  //     {
  //       key: 'panier-actif',
  //       label: 'Actifs',
  //       url: 'dashboard/sortie-stock/panier/actif',
  //       parentKey: 'actif',
  //     }
  //   ],
  // },
  // {
  //   key: 'distribution',
  //   icon: 'iconoir-delivery-truck', 
  //   label: 'Distribution',
  //   collapsed: true,
  //   subMenu: [
  //     {
  //       key: 'distribution-client',
  //       label: 'Clients',
  //       url: 'dashboard/sortie-stock/distribution/client',
  //       parentKey: 'client',
  //     },
  //     {
  //       key: 'distribution-detaille-panier',
  //       label: 'Détail panier',
  //       url: 'dashboard/sortie-stock/distribution/detaille-panier',
  //       parentKey: 'detaille-panier',
  //     }
  //   ],
  // },
];

/*export const MENU_ITEMS: MenuItem[] = [
  {
    key: 'main',
    label: 'Stock Interne',
    isTitle: true,
  },
  {
    key: 'dashboards',
    icon: 'iconoir-home-simple',
    label: 'Dashboards',
    collapsed: false,
    subMenu: [
      {
        key: 'dashboard-analytics',
        label: 'Analytics',
        url: '/dashboard/analytics',
        parentKey: 'dashboards',
      },
      // {
      //   key: 'dashboard-ecommerce',
      //   label: 'Ecommerce',
      //   url: '/dashboard/ecommerce',
      //   parentKey: 'dashboards',
      // },
    ],
  },
  {
    key: 'inventory',
    icon: 'iconoir-bookmark-book',
    label: 'Inventory',
    collapsed: false,
    subMenu: [
      {
        key: 'inventory-items',
        label: 'Items',
        url: '/inventory/items',
        parentKey: 'inventory',
      },
      {
        key: 'inventory-adjustements',
        label: 'Adjustement',
        url: '/inventory/adjustements',
        parentKey: 'inventory',
      },
    ],
  },
  {
    key: 'sales',
    icon: 'iconoir-cart',
    label: 'Sales',
    collapsed: false,
    subMenu: [
      {
        key: 'sales-customers',
        label: 'Customers',
        url: '/sales/customers',
        parentKey: 'sales',
      },
      // {
      //   key: 'dashboard-ecommerce',
      //   label: 'Ecommerce',
      //   url: '/dashboard/ecommerce',
      //   parentKey: 'dashboards',
      // },
    ],
  },
  {
    key: 'purchases',
    icon: 'iconoir-paste-clipboard',
    label: 'Purchases',
    collapsed: false,
    subMenu: [
      {
        key: 'purchases-vendors',
        label: 'Vendors',
        url: '/purchases/vendors',
        parentKey: 'purchases',
      },
      {
        key: 'purchases-bills',
        label: 'Bills',
        url: '/purchases/bills',
        parentKey: 'purchases',
      },
    ],
  },

  
  // {
  //   key: 'apps',
  //   icon: 'iconoir-view-grid',
  //   collapsed: true,
  //   label: 'Applications',
  //   subMenu: [
  //     {
  //       key: 'apps-analytics',
  //       label: 'Analytics',
  //       collapsed: true,
  //       parentKey: 'apps',
  //       subMenu: [
  //         {
  //           key: 'apps-analytics-customers',
  //           label: 'Customers',
  //           url: '/apps/analytics/customers',
  //           parentKey: 'apps-analytics',
  //         },
  //         {
  //           key: 'apps-analytics-reports',
  //           label: 'Reports',
  //           url: '/apps/analytics/reports',
  //           parentKey: 'apps-analytics',
  //         },
  //       ],
  //     },
  //     {
  //       key: 'apps-projects',
  //       label: 'Projects',
  //       collapsed: true,
  //       parentKey: 'apps',
  //       subMenu: [
  //         {
  //           key: 'apps-projects-clients',
  //           label: 'Clients',
  //           collapsed: true,
  //           url: '/apps/projects/clients',
  //           parentKey: 'apps-projects',
  //         },
  //         {
  //           key: 'apps-projects-team',
  //           label: 'Team',
  //           url: '/apps/projects/team',
  //           parentKey: 'apps-projects',
  //         },
  //         {
  //           key: 'apps-projects-project',
  //           label: 'Project',
  //           url: '/apps/projects/project',
  //           parentKey: 'apps-projects',
  //         },
  //         {
  //           key: 'apps-projects-task',
  //           label: 'Task',
  //           url: '/apps/projects/task',
  //           parentKey: 'apps-projects',
  //         },
  //         {
  //           key: 'apps-projects-kanban',
  //           label: 'Kanban Board',
  //           url: '/apps/projects/kanban',
  //           parentKey: 'apps-projects',
  //         },
  //         {
  //           key: 'apps-projects-users',
  //           label: 'Users',
  //           url: '/apps/projects/users',
  //           parentKey: 'apps-projects',
  //         },
  //         {
  //           key: 'apps-projects-create',
  //           label: 'Project Create',
  //           url: '/apps/projects/create',
  //           parentKey: 'apps-projects',
  //         },
  //       ],
  //     },
  //     {
  //       key: 'apps-ecommerce',
  //       label: 'Ecommerce',
  //       parentKey: 'apps',
  //       collapsed: true,
  //       subMenu: [
  //         {
  //           key: 'apps-ecommerce-products',
  //           label: 'Products',
  //           url: '/apps/ecommerce/products',
  //           parentKey: 'apps-ecommerce',
  //         },
  //         {
  //           key: 'apps-ecommerce-customers',
  //           label: 'Customers',
  //           url: '/apps/ecommerce/customers',
  //           parentKey: 'apps-ecommerce',
  //         },
  //         {
  //           key: 'apps-ecommerce-customers-details',
  //           label: 'Customer Details',
  //           url: '/apps/ecommerce/customers/101',
  //           parentKey: 'apps-ecommerce',
  //         },
  //         {
  //           key: 'apps-ecommerce-orders',
  //           label: 'Orders',
  //           url: '/apps/ecommerce/orders',
  //           parentKey: 'apps-ecommerce',
  //         },
  //         {
  //           key: 'apps-ecommerce-orders-details',
  //           label: 'Order Details',
  //           url: '/apps/ecommerce/orders/3001',
  //           parentKey: 'apps-ecommerce',
  //         },
  //         {
  //           key: 'apps-ecommerce-refunds',
  //           label: 'Refunds',
  //           url: '/apps/ecommerce/refunds',
  //           parentKey: 'apps-ecommerce',
  //         },
  //       ],
  //     },
  //     {
  //       key: 'apps-chat',
  //       label: 'Chat',
  //       parentKey: 'apps',
  //       url: '/apps/chat',
  //     },
  //     {
  //       key: 'apps-contact-list',
  //       label: 'Contact List',
  //       parentKey: 'apps',
  //       url: '/apps/contacts',
  //     },
  //     {
  //       key: 'apps-calendar',
  //       label: 'Calendar',
  //       parentKey: 'apps',
  //       url: '/apps/calendar',
  //     },
  //     {
  //       key: 'apps-invoice',
  //       label: 'Invoice',
  //       parentKey: 'apps',
  //       url: '/apps/invoice',
  //     },
  //   ],
  // },
  // {
  //   key: 'components',
  //   label: 'COMPONENTS',
  //   isTitle: true,
  // },
  // {
  //   key: 'base-ui',
  //   icon: 'iconoir-compact-disc',
  //   label: 'UI Elements',
  //   collapsed: true,
  //   subMenu: [
  //     {
  //       key: 'base-ui-alerts',
  //       label: 'Alerts',
  //       url: '/ui/alerts',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-avatars',
  //       label: 'Avatar',
  //       url: '/ui/avatars',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-buttons',
  //       label: 'Buttons',
  //       url: '/ui/buttons',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-badges',
  //       label: 'Badges',
  //       url: '/ui/badges',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-cards',
  //       label: 'Cards',
  //       url: '/ui/cards',
  //       parentKey: 'base-ui',
  //     },

  //     {
  //       key: 'base-ui-carousel',
  //       label: 'Carousels',
  //       url: '/ui/carousel',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-dropdowns',
  //       label: 'Dropdowns',
  //       url: '/ui/dropdowns',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-grids',
  //       label: 'Grids',
  //       url: '/ui/grids',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-images',
  //       label: 'Images',
  //       url: '/ui/images',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-list',
  //       label: 'List',
  //       url: '/ui/list',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-modals',
  //       label: 'Modals',
  //       url: '/ui/modals',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-navs',
  //       label: 'Navs',
  //       url: '/ui/navs',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-navbar',
  //       label: 'Navbar',
  //       url: '/ui/navbar',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-pagination',
  //       label: 'Paginations',
  //       url: '/ui/paginations',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-popover-tooltip',
  //       label: 'Popover & Tooltips',
  //       url: '/ui/popovers-tooltips',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-progress',
  //       label: 'Progress',
  //       url: '/ui/progress',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-spinners',
  //       label: 'Spinners',
  //       url: '/ui/spinners',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-tabs-accordion',
  //       label: 'Tabs & Accordions',
  //       url: '/ui/tabs-accordion',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-typography',
  //       label: 'Typography',
  //       url: '/ui/typography',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-videos',
  //       label: 'Videos',
  //       url: '/ui/videos',
  //       parentKey: 'base-ui',
  //     },
  //   ],
  // },
  // {
  //   key: 'advanced-ui',
  //   icon: 'iconoir-peace-hand',
  //   collapsed: true,
  //   badge: {
  //     text: 'new',
  //     variant: 'info',
  //   },
  //   label: 'Advanced UI',
  //   subMenu: [
  //     {
  //       key: 'advanced-ui-animation',
  //       label: 'Animation',
  //       url: '/advanced/animation',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-clipboard',
  //       label: 'Clip Board',
  //       url: '/advanced/clipboard',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-dragula',
  //       label: 'Dragula',
  //       url: '/advanced/dragula',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-file-manager',
  //       label: 'File Manager',
  //       url: '/advanced/file-manager',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-highlight',
  //       label: 'Highlight',
  //       url: '/advanced/highlight',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-range-slider',
  //       label: 'Range Slider',
  //       url: '/advanced/range-slider',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-ratings',
  //       label: 'Ratings',
  //       url: '/advanced/ratings',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-ribbons',
  //       label: 'Ribbons',
  //       url: '/advanced/ribbons',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-sweet-alert',
  //       label: 'Sweet Alerts',
  //       url: '/advanced/sweetalerts',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-toast',
  //       label: 'Toasts',
  //       url: '/advanced/toasts',
  //       parentKey: 'advanced-ui',
  //     },
  //   ],
  // },
  {
    key: 'forms',
    icon: 'iconoir-journal-page',
    label: 'Forms',
    collapsed: true,
    subMenu: [
      {
        key: 'forms-basic-elements',
        label: 'Basic Elements',
        url: '/forms/basic',
        parentKey: 'forms',
      },
      {
        key: 'forms-advance',
        label: 'Advance Elements',
        url: '/forms/advance',
        parentKey: 'forms',
      },
      {
        key: 'forms-validation',
        label: 'Validation',
        url: '/forms/validation',
        parentKey: 'forms',
      },
      {
        key: 'forms-wizard',
        label: 'Wizard',
        url: '/forms/wizard',
        parentKey: 'forms',
      },
      {
        key: 'forms-editors',
        label: 'Editors',
        url: '/forms/editors',
        parentKey: 'forms',
      },
      {
        key: 'forms-file-uploads',
        label: 'File Upload',
        url: '/forms/file-uploads',
        parentKey: 'forms',
      },
      {
        key: 'forms-image-crop',
        label: 'Image Crop',
        url: '/forms/image-crop',
        parentKey: 'forms',
      },
    ],
  },
  // {
  //   key: 'charts',
  //   label: 'Charts',
  //   collapsed: true,
  //   icon: 'iconoir-candlestick-chart',
  //   subMenu: [
  //     {
  //       key: 'charts-apex',
  //       label: 'Apex',
  //       url: '/charts/apex',
  //       parentKey: 'charts',
  //     },
  //     {
  //       key: 'charts-justgage',
  //       label: 'JustGage',
  //       url: '/charts/justgage',
  //       parentKey: 'charts',
  //     },
  //     {
  //       key: 'charts-chartjs',
  //       label: 'Chartjs',
  //       url: '/charts/chartjs',
  //       parentKey: 'charts',
  //     },
  //     {
  //       key: 'charts-toast',
  //       label: 'Toast',
  //       url: '/charts/toast',
  //       parentKey: 'charts',
  //     },
  //   ],
  // },
  // {
  //   key: 'tables',
  //   icon: 'iconoir-table-rows ',
  //   label: 'Tables',
  //   collapsed: true,
  //   subMenu: [
  //     {
  //       key: 'tables-basic',
  //       label: 'Basic',
  //       url: '/tables/basic',
  //       parentKey: 'tables',
  //     },
  //     {
  //       key: 'tables-data-tables',
  //       label: 'Datatables',
  //       url: '/tables/data-tables',
  //       parentKey: 'tables',
  //     },
  //   ],
  // },
  // {
  //   key: 'icons',
  //   icon: 'iconoir-trophy',
  //   label: 'Icons',
  //   collapsed: true,
  //   subMenu: [
  //     {
  //       key: 'icons-font-awesome',
  //       label: 'Font Awesome',
  //       url: '/icons/fa',
  //       parentKey: 'icons',
  //     },
  //     {
  //       key: 'icons-line-awesome',
  //       label: 'Line Awesome',
  //       url: '/icons/la',
  //       parentKey: 'icons',
  //     },
  //     {
  //       key: 'icons-icofont',
  //       label: 'Icofont',
  //       url: '/icons/icofont',
  //       parentKey: 'icons',
  //     },
  //     {
  //       key: 'icons-iconoir',
  //       label: 'Iconoir',
  //       url: '/icons/iconoir',
  //       parentKey: 'icons',
  //     },
  //   ],
  // },
  // {
  //   key: 'maps',
  //   collapsed: true,
  //   icon: 'iconoir-navigator-alt',
  //   label: 'Maps',
  //   subMenu: [
  //     {
  //       key: 'maps-google',
  //       label: 'Google Maps',
  //       url: '/maps/google',
  //       parentKey: 'maps',
  //     },
  //     {
  //       key: 'maps-leaflet',
  //       label: 'Leaflet Maps',
  //       url: '/maps/leaflet',
  //       parentKey: 'maps',
  //     },
  //     {
  //       key: 'maps-vector',
  //       label: 'Vector Maps',
  //       url: '/maps/vector',
  //       parentKey: 'maps',
  //     },
  //   ],
  // },
  // {
  //   key: 'email-templates',
  //   collapsed: true,
  //   label: 'Email Templates',
  //   icon: 'iconoir-send-mail',
  //   subMenu: [
  //     {
  //       key: 'email-templates-basic',
  //       label: 'Basic Action Email',
  //       url: '/email-templates/basic',
  //       parentKey: 'email-templates',
  //     },
  //     {
  //       key: 'email-templates-alert',
  //       label: 'Alert Email',
  //       url: '/email-templates/alert',
  //       parentKey: 'email-templates',
  //     },
  //     {
  //       key: 'email-templates-billing',
  //       label: 'Billing Email',
  //       url: '/email-templates/billing',
  //       parentKey: 'email-templates',
  //     },
  //   ],
  // },
  // {
  //   key: 'crafted',
  //   label: 'CRAFTED',
  //   isTitle: true,
  // },
  // {
  //   key: 'pages',
  //   label: 'Pages',
  //   collapsed: true,
  //   isTitle: false,
  //   icon: 'iconoir-page-star',
  //   subMenu: [
  //     {
  //       key: 'page-profile',
  //       label: 'Profile',
  //       url: '/pages/profile',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'page-notifications',
  //       label: 'Notifications',
  //       url: '/pages/notifications',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'page-timeline',
  //       label: 'Timeline',
  //       url: '/pages/timeline',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'page-tree-view',
  //       label: 'Treeview',
  //       url: '/pages/treeview',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'page-starter',
  //       label: 'Starter Page',
  //       url: '/pages/starter',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'page-pricing',
  //       label: 'Pricing',
  //       url: '/pages/pricing',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'page-blogs',
  //       label: 'Blogs',
  //       url: '/pages/blogs',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'page-faqs',
  //       label: 'FAQs',
  //       url: '/pages/faqs',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'page-gallery',
  //       label: 'Gallery',
  //       url: '/pages/gallery',
  //       parentKey: 'pages',
  //     },
  //   ],
  // },
  // {
  //   key: 'page-authentication',
  //   label: 'Authentication',
  //   isTitle: false,
  //   collapsed: true,
  //   icon: 'iconoir-fingerprint-lock-circle',
  //   subMenu: [
  //     {
  //       key: 'log-in',
  //       label: 'Log in',
  //       url: '/auth/log-in',
  //       parentKey: 'page-authentication',
  //     },
  //     {
  //       key: 'register',
  //       label: 'Register',
  //       url: '/auth/register',
  //       parentKey: 'page-authentication',
  //     },
  //     {
  //       key: 'reset-pass',
  //       label: 'Re-Password',
  //       url: '/auth/reset-pass',
  //       parentKey: 'page-authentication',
  //     },
  //     {
  //       key: 'lock-screen',
  //       label: 'Lock Screen',
  //       url: '/auth/lock-screen',
  //       parentKey: 'page-authentication',
  //     },
  //     {
  //       key: 'maintenance',
  //       label: 'Maintenance',
  //       url: '/maintenance',
  //       target: '_blank',
  //       parentKey: 'page-authentication',
  //     },
  //     {
  //       key: 'error-404',
  //       label: 'Error 404',
  //       url: '/not-found',
  //       parentKey: 'page-authentication',
  //     },
  //     {
  //       key: 'error-500',
  //       label: 'Error 500',
  //       url: '/error-500',
  //       parentKey: 'page-authentication',
  //     },
  //   ],
  // },
]*/
