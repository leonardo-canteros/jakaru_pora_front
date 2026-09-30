# Front de monitoreo de huertas para Jakaru Porá

Demo visual e interactiva de Agronautas para explorar cómo registrar y consultar la evolución de huertas vinculadas con el programa Jakaru Porá. La propuesta presenta un seguimiento inicial para huertas de estudio y una posible ampliación futura a huertas familiares y comunitarias.

**Estado actual:** demo del front con datos simulados. No recibe lecturas de sensores ni consulta un servidor.

## Tecnologías y requisitos

- React 19, React DOM 19 y React Router DOM 7.
- TypeScript 6 y Vite 8 para desarrollo y compilación.
- Node.js 22.12 o posterior compatible con Vite, npm y un navegador moderno.

Las versiones concretas instaladas quedan registradas en `package-lock.json`. El proyecto usa npm; no requiere variables de entorno.

## Instalación y ejecución

Desde la carpeta del proyecto:

```powershell
npm install
npm run dev
```

Abrí en el navegador la **URL local que muestre Vite en la terminal** (habitualmente `http://localhost:5173/`). La portada está en `/#/` y el panel en `/#/demo`; se usa navegación con `#` para facilitar una publicación estática.

Para generar la versión de producción y revisarla localmente:

```powershell
npm run build
npm run preview
```

La compilación ejecuta TypeScript y Vite; el resultado queda en `dist/`. `npm run preview` muestra su propia URL local en la terminal.

## Pantallas e interacciones

- **Inicio:** propuesta, etapas, beneficios y presentación de Agronautas, con acceso a la demo.
- **Resumen:** huerta activa, últimas lecturas, observaciones y gráfico de la variable elegida.
- **Huertas:** selección de huerta, búsqueda por nombre, localidad o cultivo, filtro por tipo, ficha e historial del período.
- **Estudio:** comparación de dos huertas para la misma variable mediante gráfico y valores recientes.
- **Barra del panel:** períodos de 7 y 30 días, alta manual de lecturas de ejemplo y observaciones, y restablecimiento con confirmación.

La interfaz incluye estilos para escritorio y teléfono e indica que los datos son simulados.

## Organización del código

- `src/pages/`: portada y contenedor del panel.
- `src/components/`: navegación, formularios, gráficos y vistas de Resumen, Huertas y Estudio.
- `src/data/`: tres huertas ficticias y registros iniciales.
- `src/state/`: estado compartido y persistencia de la demo.
- `src/services/`: funciones locales de consulta de los datos iniciales.
- `src/styles.css`, `src/public.css`, `src/dashboard.css` y `src/responsive.css`: estilos generales, públicos, del panel y adaptables.
- `src/types.ts`: tipos de huertas, lecturas y observaciones.

## Datos, identidad y personalización

Los nombres, localidades, cultivos, mediciones y observaciones son ficticios. Las fechas de ejemplo se ajustan al día en que se abre la demo para que los períodos de consulta tengan registros visibles. Humedad del suelo y temperatura ambiente ilustran la interfaz; no representan variables definitivas del dispositivo.

Las lecturas y observaciones agregadas se guardan en `localStorage` del navegador. Permanecen al recargar en ese mismo navegador y se eliminan al confirmar **Restablecer demo**. No se sincronizan entre dispositivos.

Para cambiar los datos de ejemplo, editá `src/data/demoData.ts`. Los colores base están en las variables de `src/styles.css` y sus usos en las otras hojas de estilo. La marca actual es principalmente texto y gráficos del código: revisá `src/components/SiteHeader.tsx`, `src/components/PublicLayout.tsx`, `src/pages/HomePage.tsx`, `src/pages/DemoPage.tsx` y `src/components/Icon.tsx` para incorporar o modificar logos e iconos.

## Alcance y próximos pasos

No hay backend, autenticación, conexión a sensores, recomendaciones agronómicas ni datos reales del programa. La portada plantea validar primero el registro y la consulta junto con especialistas y evaluar después dispositivos más accesibles y la ampliación del seguimiento. Esas etapas son una propuesta; todavía no están implementadas en esta demo.

