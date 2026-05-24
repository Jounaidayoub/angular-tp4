# Réponses — Questions de compréhension TP4

## Exercice 1 — Configuration des Routes & RouterOutlet

**1. Que fait `pathMatch: 'full'` ? Que se passerait-il sans cet attribut ?**

`pathMatch: 'full'` indique qu'une route ne correspond que si l'URL entière est exactement égale au chemin défini (ici, la chaîne vide pour la racine `/`). Sans cet attribut, Angular utilise la stratégie `'prefix'` par défaut : la route racine `''` correspondrait à TOUS les chemins (car `''` est un préfixe de toutes les URL). Cela provoquerait une boucle de redirection infinie pour `redirectTo`.

**2. Pourquoi faut-il importer `RouterOutlet` dans `imports:[]` du composant ?**

Depuis Angular v14+ (et obligatoire en standalone avec v21), les composants standalone ne peuvent utiliser que les directives explicitement importées. `RouterOutlet` est une directive Angular qui doit être importée dans le tableau `imports[]` pour que le sélecteur `<router-outlet>` soit reconnu dans le template.

**3. Peut-on avoir plusieurs `<router-outlet>` dans la même application ?**

Oui, absolument. On peut avoir un `<router-outlet>` principal dans AppComponent, et d'autres `<router-outlet>` dans les composants parents pour les routes imbriquées (children). Chaque niveau de routage a son propre outlet.

**4. Que se passe-t-il si on ne met pas la route `**` en dernier ?**

Le wildcard `**` correspond à TOUTES les URL. Si placé avant les autres routes, il les intercepterait toutes et aucune route spécifique ne fonctionnerait — tout serait redirigé vers la page 404. Angular évalue les routes de haut en bas et prend la première correspondance.

---

## Exercice 2 — RouterLink, RouterLinkActive & Navbar

**1. À quoi sert `[routerLinkActiveOptions]="{exact: true}"` sur la route `/accueil` ?**

Sans `{exact: true}`, le lien "Accueil" serait actif sur toutes les routes commençant par `/accueil` (ex: `/accueil/sous-page`). Avec `exact: true`, il n'est actif que lorsque l'URL est exactement `/accueil`.

**2. Comment ajouter PLUSIEURS classes CSS quand un lien est actif ?**

On peut utiliser une chaîne avec des classes séparées par des espaces :
```html
<a routerLink="/produits" routerLinkActive="actif surligne">Produits</a>
```
Ou un tableau :
```html
<a routerLink="/produits" [routerLinkActive]="['actif', 'surligne']">Produits</a>
```

**3. Quelle est la différence entre `routerLink="/produits"` et `[routerLink]="['/produits', id]"` ?**

- `routerLink="/produits"` : liaison statique vers l'URL fixe `/produits`
- `[routerLink]="['/produits', id]"` : liaison dynamique — `id` est une expression TypeScript. Si `id = 5`, l'URL générée est `/produits/5`

---

## Exercice 3 — Routes avec Paramètres & ActivatedRoute

**1. Pourquoi écrit-on `+this.id` et pas juste `this.id` lors de la recherche par id ?**

Les paramètres de route (`:id`) sont toujours des chaînes de caractères dans l'URL. `+this.id` est l'opérateur unaire `+` qui convertit la chaîne `"5"` en nombre `5`. La méthode `getById(number)` attend un paramètre de type `number`.

**2. Quelle est la différence entre `snapshot.params` et `paramMap.get()` ?**

- `snapshot.params` : lecture unique et immédiate — ne se met pas à jour si le paramètre change sans recréer le composant
- `paramMap.get()` : peut être utilisé avec `.subscribe()` pour réagir aux changements de paramètres (ex: navigation de `/produits/1` vers `/produits/2` dans le même composant)

**3. Comment lire un query param (`?page=2`) avec ActivatedRoute ?**

```typescript
// Lecture simple (snapshot)
this.route.snapshot.queryParams['page']

// Réactive (avec subscription)
this.route.queryParams.subscribe(params => {
  const page = params['page'];
});
```

**4. Si on navigue de `/produits/1` vers `/produits/2` SANS quitter le composant, `ngOnInit()` est-il rappelé ? Comment gérer ce cas ?**

Non, `ngOnInit()` n'est pas rappelé car Angular réutilise le même composant. Pour gérer ce cas, il faut souscrire aux changements de paramètres :
```typescript
this.route.params.subscribe(params => {
  this.id = params['id'];
  this.produit = this.produitService.getById(+this.id);
});
```

---

## Exercice 4 — Navigation Programmée avec Router

**1. Quelle est la différence entre `router.navigate(['/admin'])` et `router.navigateByUrl('/admin')` ?**

- `router.navigate()` : prend un tableau de segments de route, peut naviguer de manière relative avec `{relativeTo: this.route}`, et accepte des options (queryParams, fragment, etc.)
- `router.navigateByUrl()` : prend une URL complète sous forme de chaîne, toujours interprétée comme une URL absolue

**2. Comment naviguer de manière relative depuis la route courante ?**

```typescript
this.router.navigate(['enfant'], { relativeTo: this.route });
```
où `this.route` est l'ActivatedRoute injecté. Navigue vers une route enfant de la route courante.

**3. Comment lire un query param depuis un autre composant ?**

Dans le composant de destination, on utilise `ActivatedRoute` :
```typescript
this.route.snapshot.queryParams['q']  // lit ?q=laptop
```

---

## Exercice 5 — Routes Imbriquées & Lazy Loading

**1. Quelle est la différence structurelle entre un AppComponent et un AdminComponent ?**

- `AppComponent` : contient le `<router-outlet>` principal de l'application + la barre de navigation globale
- `AdminComponent` : contient son propre `<router-outlet>` pour les sous-routes (dashboard, users, produits) + une sidebar de navigation admin

**2. Combien de `<router-outlet>` peut-on avoir dans une application Angular ?**

Autant que nécessaire — un par niveau de routes imbriquées. Chaque composant parent peut avoir son propre `<router-outlet>` pour afficher ses enfants.

**3. Quand `canActivate` est sur la route parent, s'applique-t-il aux enfants aussi ?**

Oui, `canActivate` sur la route parent s'applique automatiquement à tous les enfants (children). Si le guard refuse l'accès au parent, aucun enfant n'est accessible.

**4. Quel est l'avantage principal du Lazy Loading sur une grande application ?**

Le Lazy Loading réduit la taille du bundle initial en chargeant les composants à la demande. Les sections rarement visitées (admin, rapports) ne sont téléchargées que lorsque l'utilisateur y navigue, ce qui améliore le temps de chargement initial et les performances perçues.

---

## Exercice 6 — Guard canActivate

*(Aucune question de compréhension spécifique pour cet exercice dans le PDF)*
