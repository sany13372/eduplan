/* eslint-disable */
type Options = {
  expires?: Date | number | string;
  path?: string;
  domain?: string;
  secure?: boolean;
};

class Cookie {
  static set(name: string, value: string, options?: Options) {
    options = options || {};

    let { expires } = options;

    if (typeof expires === 'number' && expires) {
      const d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }
    if (expires && (<Date>expires).toUTCString) {
      options.expires = (<Date>expires).toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = `${name}=${value}`;

    let propName: keyof Options;
    for (propName in options) {
      updatedCookie += `; ${propName}`;
      const propValue = options[propName];
      if (propValue !== true) {
        updatedCookie += `=${propValue}`;
      }
    }

    document.cookie = updatedCookie;
  }

  static get(name: string): string {
    const matches = document.cookie.match(
      new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`),
    );
    return matches ? decodeURIComponent(matches[1]) : '';
  }
}

export function setCookie(name: string, value: string, options?: Options) {
  Cookie.set(name, value, options);
}

export function getCookie(name: string) {
  return Cookie.get(name);
}

export function deleteCookie(name: string) {
  setCookie(name, '', {
    expires: -1,
  });
}

export default Cookie;
