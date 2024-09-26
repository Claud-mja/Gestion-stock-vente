import { Route } from '@angular/router'
import { AlertStockComponent } from './stock_interne/produit/alert-stock/alert-stock.component'
import { SaisieMultipleComponent } from './stock_interne/produit/saisie-multiple/saisie-multiple.component'
import { ClientComponent } from './sortie_stock/distribution/client/client.component'
import { DetaillePanierComponent } from './sortie_stock/distribution/detaille-panier/detaille-panier.component'
import { ActifComponent } from './sortie_stock/panier/actif/actif.component'
import { PayeComponent } from './sortie_stock/panier/paye/paye.component'
import { ResteComponent } from './sortie_stock/panier/reste/reste.component'
import { CreerComponent } from './sortie_stock/panier/creer/creer.component'
import { RavitaillementComponent } from './stock_interne/mouvement/ravitaillement/ravitaillement.component'
import { InventaireComponent } from './stock_interne/mouvement/inventaire/inventaire.component'
import { HistoriqueComponent } from './stock_interne/mouvement/historique/historique.component'
import { EntrepotComponent } from './stock_interne/configuration/entrepot/entrepot.component'
import { CategorieComponent } from './stock_interne/configuration/categorie/categorie.component'
import { UniteMesureComponent } from './stock_interne/configuration/unite-mesure/unite-mesure.component'
import { TypeProduitComponent } from './stock_interne/configuration/type-produit/type-produit.component'
import { StComponent } from './st/st.component'
import { ListeComponent } from './stock_interne/produit/liste/liste.component'
import { NewComponent } from './stock_interne/produit/new/new.component'
import { NewRavitaillementComponent } from './stock_interne/mouvement/ravitaillement/new-ravitaillement/new-ravitaillement.component'
import { NewInventaireComponent } from './stock_interne/mouvement/inventaire/new-inventaire/new-inventaire.component'
import { OrderDetailsComponent } from './stock_interne/mouvement/order-details/order-details.component'
import { DetailsComponent } from './stock_interne/mouvement/ravitaillement/details/details.component'
import { InventaireDetailsComponent } from './stock_interne/mouvement/inventaire/inventaire-details/inventaire-details.component'
import { CarteSimpleImplComponent } from './sortie_stock/mouvement_sortant/carte-simple-impl/carte-simple-impl.component'
import { CarteLivraisonComponent } from './sortie_stock/mouvement_sortant/carte-livraison/carte-livraison.component'
import { CarteCreditImplComponent } from './sortie_stock/mouvement_sortant/carte-credit-impl/carte-credit-impl.component'

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: 'stpage',
    component: StComponent,
    data: { title: 'Gestion Stock' },
  },
  {
    path: 'stock-interne/new',
    component: NewComponent,
    data: { title: 'Nouveau' },
  },
  {
    path: 'stock-interne/produit/saisie-multiple',
    component: SaisieMultipleComponent,
    data: { title: 'Saisie multiple' },
  },
  {
    path: 'stock-interne/produit/liste',
    component: ListeComponent,
    data: { title: 'Liste' },
  },
  {
    path: 'stock-interne/produit/alert',
    component: AlertStockComponent,
    data: { title: 'Alerte Stock' },
  },
  {
    path: 'stock-interne/mouvement-stock/nouveau',
    component: NewRavitaillementComponent,
    data: { title: 'Nouveau Ravitaillement' },
  },
  {
    path: 'stock-interne/mouvement-stock/ravitaillement',
    component: RavitaillementComponent,
    data: { title: 'Ravitaillement' },
  },
  {
    path: 'stock-interne/mouvement-stock/ravitaillement-details/:id',
    component: DetailsComponent,
    data: { title: 'Ravitaillement' },
  },
  {
    path: 'stock-interne/mouvement-stock/ravitaillement-detail/:id',
    component: OrderDetailsComponent,
    data: { title: 'Ravitaillement' },
  },
  {
    path: 'stock-interne/mouvement-stock/nouveau-iventaire',
    component: NewInventaireComponent,
    data: { title: 'Nouveau Ravitaillement' },
  },
  {
    path: 'stock-interne/mouvement-stock/inventaire',
    component: InventaireComponent,
    data: { title: 'Inventaire' },
  },
  {
    path: 'stock-interne/mouvement-stock/inventaire-detail/:id',
    component: InventaireDetailsComponent,
    data: { title: 'Inventaire' },
  },
  {
    path: 'stock-interne/mouvement-stock/historique',
    component: HistoriqueComponent,
    data: { title: 'Historique' },
  },
  {
    path: 'stock-interne/configuration-intiale/multi-entrepot',
    component: EntrepotComponent,
    data: { title: 'Multi-entrepots' },
  },
  {
    path: 'stock-interne/configuration-intiale/categorie',
    component: CategorieComponent,
    data: { title: 'Categorie de produit' },
  },
  {
    path: 'stock-interne/configuration-intiale/unit-mesure',
    component: UniteMesureComponent,
    data: { title: 'Unité de mésure' },
  },
  {
    path: 'stock-interne/configuration-intiale/type-produit',
    component: TypeProduitComponent,
    data: { title: 'Type de produit' },
  },
  {
    path: 'sortie-stock/mouvement-sortant/carte-simple',
    component: CarteSimpleImplComponent,
    data: { title: 'Carte simple' },
  },
  {
    path: 'sortie-stock/mouvement-sortant/carte-credit',
    component: CarteCreditImplComponent,
    data: { title: 'Carte de credit' },
  },
  {
    path: 'sortie-stock/mouvement-sortant/carte-livraison',
    component: CarteLivraisonComponent,
    data: { title: 'Carte de livraison' },
  },
  {
    path: 'sortie-stock/panier/creer',
    component: CreerComponent,
    data: { title: 'Creer' },
  },
  {
    path: 'sortie-stock/panier/reste',
    component: ResteComponent,
    data: { title: 'Reste à payer' },
  },
  {
    path: 'sortie-stock/panier/paye',
    component: PayeComponent,
    data: { title: 'Paye' },
  },
  {
    path: 'sortie-stock/panier/actif',
    component: ActifComponent,
    data: { title: 'Actifs' },
  },
  {
    path: 'sortie-stock/distribution/client',
    component: ClientComponent,
    data: { title: 'Clients' },
  },
  {
    path: 'sortie-stock/distribution/detaille-panier',
    component: DetaillePanierComponent,
    data: { title: 'Détail panier' },
  },
]
