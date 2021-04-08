# vue-composable-utils

Vue Composable Utils implemented as vue composition functions. currently usable with the `@vue/composition-api`.
## Installation

```bash
# install with yarn
yarn add @vue/composition-api vue-composable-utils
# install with npm
npm install @vue/composition-api vue-composable-utils
```

## Documentation

Check our [documentation](https://abdulnasirolcan.me/vue-composable-utils/)

## Composable Utils

| Name                                                     | Arguments                          | Returns                                                      |
| -------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------ |
| [`UseBind`](#useBind)                                    | initial                            | value, changed, reset                                        |
| [`UseEmbed`](#useEmbed)                                  | f                                  | -                                                            |
| [`UseState`](#useState)                                  | initial                            | value, set                                                   |
| [`UseList`](#UseList)                                    | initial                            | list, set, reduce, sort, first, deleteFirst, deleteLast, last,filter, push, reset| 


- [UseBind](./vue-composable-utils/bind.md).
- [UseEmbed](./vue-composable-utils/embed.md).
- [UseState](./vue-composable-utils/state.md).
- [UseList](./vue-composable-utils/list.md).

## Usage

```vue
<template>
  <div>
    <p>list: {{ JSON.stringify(list) }}</p>
    <button @click="sort((a, b) => a - b)">Sort List</button>
    <button @click="set([...list, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])">Set list</button>
    <button @click="reduce((total, next) => {return total + next})">Sum list</button>
    <button @click="reduce((t, n) => Math.max(t, n))">Max list</button>
    <button @click="reduce((t, n) => (t.includes(n) ? t : [...t, n]))">Unique List</button>
    <button @click="reduce((t, n) => [n, ...t])">Reverse List</button>
    <button @click="reduce((t, n) => t.concat(n))">Flatten List</button>
    <button @click="reduce((t, {id, ...attrs}) => ({...t, [id]: attrs }))">Convert array to object</button>
    <button @click="reduce((t, n) => {t.push(n * 2); return t})">Map List</button>
    <button @click="deleteFirst">Delete First</button>
    <button @click="deleteLast">Delete Last</button>
    <button @click="first">First</button>
    <button @click="last">Last</button>
    <button @click="filter((a) => a >= 5)">Greater than or equal to 5</button>
    <button @click="push(11, 12, 13, 14, 15, 16, 17, 18, 19, 20)">Push</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script>
import { useList } from "vue-composable-utils";

export default {
  setup() {
    const {
      list,
      sort,
      set,
      reduce,
      first,
      deleteFirst,
      deleteLast,
      last,
      filter,
      push,
      reset
    } = useList([5,1,4,7,10,4,9,6,2,5,8,3]);

    return {
      list,
      set,
      reduce,
      sort,
      first,
      deleteFirst,
      deleteLast,
      last,
      filter,
      push,
      reset,
    };
  },
};
</script>
```

## Contributors

<table>
  <tr>
    <td align="center"><a href="#"><img src="#" width="100px;" alt=""/><br /><sub><b>Abdulnasır Olcan</b></sub></a></td>
  </tr>
</table>

## License

MIT
