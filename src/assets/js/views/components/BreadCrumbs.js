export function BreadCrumbs({ crumbs, activeCrumb, sectionClassname }) {
  return `
  <div class="${sectionClassname} breadcrumbs">
    <a class="breadcrumbs__crumb navlink" href="/">Home</a>
    ${crumbs
      .map(
        crumb => `
      <span class="breadcrumbs__divider">/</span>
      <a class="breadcrumbs__crumb navlink" href="${crumb.pathname}">${crumb.name}</a>
    `
      )
      .join('')}
    <span class="breadcrumbs__divider">/</span>
    <span class="breadcrumbs__crumb">${activeCrumb.name}</span>
  </div>
  `
}
