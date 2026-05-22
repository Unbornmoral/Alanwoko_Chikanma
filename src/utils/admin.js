export const isAdmin = () => {
  return localStorage.getItem('adminMode') === 'true';
};

export const enableAdmin = () => {
  localStorage.setItem('adminMode', 'true');
  window.location.reload();
};

export const disableAdmin = () => {
  localStorage.setItem('adminMode', 'false');
  window.location.reload();
};
