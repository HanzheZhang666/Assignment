# elderly-site

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


## Published wedsite hosted by firebase
https://week7-hanzhe.web.app/

## Test User accounts
Account Information

- Admin Account: Username: admin, Password: admin123

- Consultant Account: Username: consultant1, Password: abc123

- User Account: Username: user1, Password: abc123

## Registration
Users can create a new account using the registration page. Simply provide the required information, and your account will be ready to use.

## Access and Authorization
Some components of the platform are restricted based on user roles:

- Admin: Has full access to all features, including user management and configuration.
- Consultant: Can access consultation features and view related data.
- User: Has access to general resources and services but limited access to restricted components.
If a user tries to access a component they are not authorized for, they will be automatically redirected to the home page.