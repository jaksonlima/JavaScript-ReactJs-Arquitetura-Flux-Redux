export default function home(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_HOME':
      return [...state, action.product];
    default:
      return state;
  }
}
