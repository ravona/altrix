// eslint-disable-next-line @typescript-eslint/no-unused-vars

import '@altrix/shared-styles/index.scss';

export function App() {
    return (
        <div className="theme--base">
            <div className="app">
                <header className="app-header">Header</header>
                <main className="app-main">
                    <div className="box">
                        <div className="wrapper-size--sm p-sm mb-sm clr-txt--primary ta-c txt-md highlight">
                            SM wrapper
                        </div>
                        <div className="wrapper-size--md p-sm mb-sm clr-txt--primary ta-c txt-md highlight">
                            MD wrapper
                        </div>
                        <div className="wrapper-size--lg p-sm mb-sm clr-txt--primary ta-c txt-md highlight">
                            LG wrapper
                        </div>
                        <div className="wrapper-size--xl p-sm mb-sm clr-txt--primary ta-c txt-md highlight">
                            XL wrapper
                        </div>
                    </div>

                    <div className="box p-sm">
                        <h1 className="heading txt-xl mb-sm clr-txt--primary">
                            heading txt-xl mb-sm clr-txt--primary
                        </h1>
                        <h2 className="heading txt-lg mb-sm clr-txt--secondary">
                            heading txt-lg mb-sm clr-txt--secondary
                        </h2>
                        <h3 className="heading txt-md mb-sm clr-variant--success">
                            heading txt-md mb-sm clr-variant--success
                        </h3>
                        <h4 className="heading txt-sm mb-sm clr-variant--info">
                            heading txt-sm mb-sm clr-variant--info
                        </h4>
                        <h5 className="heading txt-xs mb-sm clr-variant--error">
                            heading txt-xs mb-sm clr-variant--error
                        </h5>
                    </div>

                    <div className="box p-sm">
                        <p className="txt-sm clr-variant--action">
                            Action Color
                        </p>
                        <p className="txt-sm clr-variant--disabled">
                            Disabled Color
                        </p>
                        <p className="txt-sm clr-variant--error">Error Color</p>
                        <p className="txt-sm clr-variant--info">Info Color</p>
                        <p className="txt-sm clr-variant--loading">
                            Loading Color
                        </p>
                        <p className="txt-sm clr-variant--success">
                            Success Color
                        </p>
                        <p className="txt-sm clr-variant--warning">
                            Warning Color
                        </p>
                    </div>

                    <div className="box p-sm flex ai-c gap-lg">
                        <button className="button button-size--xl button-clr-brand--30">
                            button-size--xl
                        </button>
                        <button className="button button-size--lg button-clr-brand--30">
                            button-size--lg
                        </button>
                        <button className="button button-size--md button-clr-brand--30">
                            button-size--md
                        </button>
                        <button className="button button-size--sm button-clr-brand--30">
                            button-size--sm
                        </button>
                        <button className="button button-size--xs button-clr-brand--30">
                            button-size--xs
                        </button>
                    </div>

                    <div className="box p-sm flex ai-c gap-md">
                        <button className="button button-size--md button-clr-variant--action">
                            Action
                        </button>
                        <button
                            disabled
                            className="button button-size--md button-clr-variant--action"
                        >
                            Disabled
                        </button>
                        <button className="button button-size--md button-clr-variant--error">
                            Error
                        </button>
                        <button className="button button-size--md button-clr-variant--info">
                            Info
                        </button>
                        <button className="button button-size--md button-clr-variant--loading">
                            Loading
                        </button>
                        <button className="button button-size--md button-clr-variant--success">
                            Success
                        </button>
                        <button className="button button-size--md button-clr-variant--warning">
                            Warning
                        </button>
                    </div>

                    <div className="box"></div>
                </main>
                <footer className="app-footer">Footer</footer>
            </div>
        </div>
    );
}

export default App;
