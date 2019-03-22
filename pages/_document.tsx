import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

interface Props {
  pageContext
}

class MyDocument extends Document<Props> {
  static getInitialProps(ctx) {
    let pageContext;
    const page = ctx.renderPage(Component => {
      const WrappedComponent = props => {
        pageContext = props.pageContext;
        return <Component {...props} />;
      }

      return WrappedComponent;
    });

    let css: string; // It might be undefined, e.g. after an error.
    if (pageContext) {
      css = pageContext.sheetsRegistry.toString();
    }

    return {
      ...page,
      pageContext,
      styles: (
        <React.Fragment>
          <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: css }} />
          {flush() || null}
        </React.Fragment>
      )
    }
  }

  render() {
    const { pageContext } = this.props;
    const themeColor = pageContext ? pageContext.theme.palette.primary.main : '';

    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content={'user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height'} />
          <meta name="theme-color" content={themeColor} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
