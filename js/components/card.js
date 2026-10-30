// Shared card markup used by About and Events
export const Card = ({ top = '', title, text }) => `
  <article class="card">${top}<h3>${title}</h3><p>${text}</p></article>`;
