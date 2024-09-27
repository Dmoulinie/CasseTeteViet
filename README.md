# Projet: Casse-tête Vietnamien

## Contexte
Ce projet est basé sur un célèbre casse-tête vietnamien qui a fait le tour d'internet en 2015. Initialement conçu pour des enfants de CE2, ce puzzle a également défié de nombreux internautes. L'objectif est de compléter un tableau en utilisant les chiffres de 1 à 9 sans les répéter.

## Énoncé du casse-tête
Le but du jeu est de remplir un tableau en respectant les règles suivantes :
- Utiliser les chiffres de 1 à 9.
- Aucun chiffre ne doit être répété.

## Fonctionnalités de l'application
Le projet consiste à développer une application web sous forme de Single Page Application (SPA) qui permet de visualiser, manipuler, et gérer les solutions du casse-tête.

### Fonctionnalités principales
L'utilisateur pourra :
- **Générer des solutions** via un algorithme et les stocker en base de données.
- **Visualiser** l'ensemble des solutions enregistrées.
- **Rechercher** des solutions à l'aide d'un filtre.
- **CRUD** (Create, Read, Update, Delete):
    - Sélectionner et afficher une solution spécifique.
    - Modifier une solution, y compris son statut (correcte/incorrecte).
    - Supprimer une solution de la base de données.
    - Supprimer toutes les solutions enregistrées.

## Technologies Requises
### Back-end
- **Framework:** Spring Boot
- **ORM:** JPA (Java Persistence API)
- **Base de données:** H2

### Front-end
- **Framework:** Angular
- **Langage:** TypeScript

### Architecture
- Le back-end exposera des API REST qui seront consommées par le front-end.
- Les solutions générées par l'algorithme seront enregistrées et gérées par la base de données H2.

## Endpoints de l'API REST
Voici les endpoints disponibles pour interagir avec l'application :

### **Génération des solutions**
- **GET** `/api/solutions/generate`: Génère les solutions et les stocke en base de données. Retourne les solutions et le temps de génération.

### **Vérification d'une solution**
- **POST** `/api/solutions/verify`: Vérifie si une liste de chiffres constitue une solution correcte.  
  **Body:** `List<Integer>` (liste de 9 chiffres).  
  **Retourne:** `Boolean` (correct ou incorrect).

### **Ajout d'une solution**
- **POST** `/api/solutions/add`: Ajoute une nouvelle solution à la base de données.  
  **Body:** `Solution` (objet JSON représentant la solution).  
  **Retourne:** L'objet `Solution` ajouté.

### **Calcul d'une solution**
- **POST** `/api/solutions/calculate`: Calcule la somme des chiffres de la solution.  
  **Body:** `List<Integer>` (liste de 9 chiffres).  
  **Retourne:** `Double` (résultat du calcul).

### **Récupérer toutes les solutions**
- **GET** `/api/solutions/get/all`: Récupère toutes les solutions enregistrées.  
  **Retourne:** Liste de `Solution`.

### **Récupérer une solution par ID**
- **GET** `/api/solutions/get/{id}`: Récupère une solution spécifique par son ID.  
  **Paramètre:** `id` (ID de la solution).  
  **Retourne:** L'objet `Solution` ou une erreur 404 si non trouvé.

### **Récupérer le dernier ID**
- **GET** `/api/solutions/get/lastId`: Récupère le dernier ID utilisé pour les solutions.  
  **Retourne:** `Long` (dernier ID).

### **Modifier une solution**
- **PUT** `/api/solutions/edit/{id}`: Modifie une solution existante par son ID.  
  **Paramètre:** `id` (ID de la solution à modifier).  
  **Body:** `Solution` (objet JSON représentant les nouvelles données).  
  **Retourne:** L'objet `Solution` mis à jour ou une erreur 404 si non trouvé.

### **Supprimer une solution par ID**
- **DELETE** `/api/solutions/delete/{id}`: Supprime une solution spécifique par son ID.  
  **Paramètre:** `id` (ID de la solution à supprimer).  
  **Retourne:** Code 200 OK.

### **Supprimer toutes les solutions**
- **DELETE** `/api/solutions/delete/all`: Supprime toutes les solutions enregistrées.  
  **Retourne:** Code 200 OK.

## Base de données
Les solutions du casse-tête seront stockées dans une base de données H2 avec des fonctionnalités CRUD complètes pour la gestion des solutions.

## Objectif Final
Créer une application web interactive, efficace, et facile à utiliser permettant de résoudre et de manipuler ce casse-tête vietnamien avec toutes les fonctionnalités demandées.
