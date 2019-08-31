import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import H2 from 'components/H2';
import CenteredSection from './CenteredSection';
import messages from './messages';

export function HomePage() {
  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="Neha application homepage"
        />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.startProjectHeader} />
          </H2>
          <p style={{ whiteSpace: 'pre' }}>
            <FormattedMessage {...messages.startProjectMessage} />
          </p>
        </CenteredSection>
      </div>
    </article>
  );
}

export default HomePage;
