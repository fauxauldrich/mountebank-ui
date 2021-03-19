import { ENV } from "../config";
import { Imposter } from "../models/Imposter";

export default class MountebankService {
  private $: any;
  constructor($: any) {
    this.$ = $;
  }
  private MB_URL: string = `http://${ENV.MB_HOST}:${ENV.MB_PORT}`;
  createImposter = (imposter: Imposter): Promise<Imposter> => {
    return this.$.ajax({
      url: `${this.MB_URL}/imposters`,
      type: "POST",
      data: JSON.stringify(imposter),
      dataType: "json",
      contentType: "application/json",
    });
  };

  getImposters = (): Promise<any> => {
    return this.$.get(`${this.MB_URL}/imposters`);
  };

  getSingleImposter = (port: number): Promise<any> => {
    return this.$.get(`${this.MB_URL}/imposters/${port}?replayable=true&removeProxies=true`);
  };

  getLogs = (): Promise<any> => {
    return this.$.get(`${this.MB_URL}/logs`);
  };

  deleteImposter = (port: number): Promise<any> => {
    return this.$.ajax({
      url: `${this.MB_URL}/imposters/${port}`,
      type: "DELETE",
    });
  };
}
