import { ref, computed, watch } from '@vue/composition-api';

/**
 * This function provides embed code related controls
 * @param {object} code This object contain two parameter.
 * @returns {object} object
 * @example{
 *
    const code = ref(null);
    const { getEmbedScriptSrc, injectScript, isEmbedBlock, clearScript } = useEmbed(code);

 *  getEmbedScriptSrc: Returns embed code property  // width, height
 *
 *   return{
 *     isEmbedBlock: Provides information whether the value entered is suitable embed code pattern or not   // true | false
 *     clear
 *   }
 * }
 */

const useEmbed = (code = ref(null)) => {
  const embedCode = ref(code.value);
  const injectedScripts = ref([]);

  const isEmbedBlock = computed(
    () =>
      /(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))/.test(embedCode.value) ||
      /(?:<blockquote[^>]*)(?:(?:\/>)|(?:>.*?<\/blockquote>))/.test(embedCode.value),
  );

  const getEmbedScriptSrc = (embedString = embedCode.value) => {
    const parser = new DOMParser();
    const parsedCode = parser.parseFromString(embedString, 'text/html');

    for (const node of parsedCode.body.childNodes) {
      if (node.tagName === 'SCRIPT') {
        return node.src;
      } else if (node.innerHTML && node.innerHTML.includes('<script')) {
        getEmbedScriptSrc(node.innerHTML);
      }
    }

    return null;
  };

  const clearScript = scriptEl => scriptEl.remove();

  const injectScript = ({ async = true, defer = false, id, src }) => {
    const scriptWithSameId = document.getElementById(id);

    if (scriptWithSameId) {
      clearScript(scriptWithSameId);
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = id;
    script.src = src;
    script.async = async;
    script.defer = defer;
    document.body.insertAdjacentElement('afterend', script);
    injectedScripts.value = [...injectedScripts.value, script];
  };

  const clear = () => {
    embedCode.value = null;
    injectedScripts.value.map(script => clearScript(script));
    injectedScripts.value = [];
  };

  const registerWatcher = callback => {
    watch(code, callback);
  };

  return {
    isEmbedBlock,
    injectScript,
    getEmbedScriptSrc,
    clearScript,
    clear,
    registerWatcher,
  };
};

export default useEmbed;