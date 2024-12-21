import { Widget } from "./components/Widget";
import ReactDom from "react-dom/client";

export const normalizeAttribute = (attribute) => {
    return attribute.repl(/-([a-z])/g, (_, letter) => 
        letter.toUpperCase());
}

class WidgetWebComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      const props = this.getPropsFromAttributes();
      const root = ReactDom.createRoot(this.shadowRoot);
      root.render(<Widget {...props} />);
    }
  
    getPropsFromAttributes() {
      const props = {};
      for (const { name, value } of this.attributes) {
        props[normalizeAttribute(name)] = value;
      }
      return props;
    }
  }
  
  export default WidgetWebComponent;