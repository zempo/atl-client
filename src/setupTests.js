import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const noop = () => {};
Object.defineProperty(window, "scrollTo", { value: noop, writable: true });
