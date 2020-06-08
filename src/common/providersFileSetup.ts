/**
 * @description
 * @export
 * @class ProvidersFileSetup
 */
export class ProvidersFileSetup {
  /**
   * @description
   * @private
   * @memberof ProvidersFileSetup
   */
  private configurations = {
    provider1: {
      delimiter: '|',
    },
    provider2: {
      delimiter: '|',
    },
    provider3: {
      delimiter: '$',
    },
  };

  /**
   * @description
   * @param {string} provider
   * @returns {*}
   * @memberof ProvidersFileSetup
   */
  getSetup(provider: string): any {
    const result = this.configurations[provider];
    if (!result) {
      throw {
        code: 404,
        message: `CSV setup for provider: ${provider} was not found`,
      };
    }
    return result;
  }
}

export default new ProvidersFileSetup();
