import * as React from "react";
import { FrequencyTime } from "./FrequencyTime";
import { FrequencyRadial } from "./FrequencyRadial";
import { Signal } from "../signal";

interface AppProps {
    signal: Signal;
}

interface AppState {
}

export class App extends React.Component<AppProps, AppState> {
    state: AppState = {}

    render() {
        const { signal } = this.props;

        return (
            <div style={{ margin: 20 }}>
                <FrequencyTime signal={signal} width={1400} height={400} steps={200} />
                <FrequencyRadial signal={signal} width={400} height={400} steps={200} />
            </div>
        )
    }
}
