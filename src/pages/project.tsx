import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ProjectView } from 'src/sections/project/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Projects - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProjectView />
    </>
  );
}
