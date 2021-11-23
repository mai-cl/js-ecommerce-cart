export default class Breadcrumbs {
  constructor({ crumbs, activeCrumb, sectionClassname }) {
    this.crumbs = crumbs
    this.activeCrumb = activeCrumb
    this.sectionClassname = sectionClassname
  }

  markup() {
    let crumbsMarkup = `<a class="breadcrumbs__crumb navlink" href="/">Home</a>`
    this.crumbs.forEach(crumb => {
      crumbsMarkup += `<span class="breadcrumbs__divider">/</span>`
      crumbsMarkup += `<a class="breadcrumbs__crumb navlink" href="${crumb.pathname}">${crumb.name}</a>`
    })
    crumbsMarkup += `<span class="breadcrumbs__divider">/</span>`
    crumbsMarkup += `<span class="breadcrumbs__crumb">${this.activeCrumb.name}</span>`

    return `
      <div class="${this.sectionClassname} breadcrumbs">
        ${crumbsMarkup}
      </div>
    `
  }
}
