import get from './http';

/**
 * An object that defines a dictionary
 *
 * A dictionary contains the dictionary JSON file url and an object, the keys
 * of which are unique string IDs, and the values are the strings, translated
 * into the language of the dictionary
 */
export default class Dictionary {
  public constructor(url: string, strings: { [id: string]: string } = {}) {
    this.url = url;
    this.strings = strings;
  }

  /**
   * Dictionary JSON-file URL
   */
  public url: string;

  /**
   * Dictionary strings with IDs
   *
   * The keys in this object are the unique string ID, whereas the values are the translated
   * strings themselves
   */
  public strings: { [id: string]: string };

  /**
   * Returns true if a string with certain ID exists in the dictionary
   *
   * @param id - the string ID
   */
  public hasString(id: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.strings, id);
  }

  /**
   * Loads the dictionary from it's URL and stores the {@link strings}
   *
   * @param cb - an optional callback to be executed after loading is finished
   */
  public load(cb?: Function): void {
    get(this.url, (r: string): void => {
      this.strings = JSON.parse(r);
      if (cb) cb();
    });
  }
}
