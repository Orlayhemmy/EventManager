const showDiv = e => {
  const id = e.target.dataset.toggleId;
  if (!id) return;
  const div = document.getElementById(id);
  div.hidden = !div.hidden;
  if (id === 'editCenterDetails') {
    const div2 = document.getElementById('centerDetails');
    if (!div.hidden) {
      div2.style.display = 'none';
      return;
    }
    div2.style.display = '';
  }
};
export default showDiv;
