import React, {Component} from "react";
import io from "socket.io-client";
import {Chart, ChartType} from "../../components/Chart/Chart";

interface socketResponse {
  value: number;
  timestamp: number;
}

interface MainContainerState {
  data: {
    values: number[];
    labels: string[];
  };
}

export class MainContainer extends Component<any, MainContainerState> {
  public socket: SocketIOClient.Socket | undefined;
  constructor(props: any) {
    super(props);
    this.state = {
      data: {
        values: [],
        labels: []
      }
    };
  }

  private createDateFromTimestamp(time: number): string {
    const date = new Date(time);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    }).format(date);
  }

  componentDidMount(): void {
    this.socket = io("http://localhost:3001");
    console.log(this.socket);
    this.socket.on("data", (data: socketResponse) => {
      this.setState({
        data: {
          values: this.state.data.values.concat(data.value),
          labels: this.state.data.labels.concat(
            this.createDateFromTimestamp(data.timestamp)
          )
        }
      });
    });
  }

  render() {
    return (
      <>
        <Chart config={this.state.data} type={ChartType.BAR} />
        <Chart config={this.state.data} type={ChartType.LINE} />
      </>
    );
  }
}

export default MainContainer;
