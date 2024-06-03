
import {a as f, s as k} from "https://productionapp2.cubi.casa/assets/tickets-b254b06f.js";
import {d as y, s as t, h as T, f as b, z as x, u as s, o as n, c as a, j as c, t as w, b as i, g as A} from "https://productionapp2.cubi.casa/assets/index-008be9b2.js";
import {r as V} from "https://productionapp2.cubi.casa/assets/roles-8392ce9c.js";
const B = {
    key: 0,
    class: "p-2 bg-danger"
}
  , E = {
    key: 0
}
  , N = i("span", null, [A(" Getting SVG... "), i("span", {
    class: "spinner-border spinner-border-sm align-middle ms-2"
})], -1)
  , P = [N]
  , C = i("div", {
    id: "cc-svg-holder",
    class: "cursor-pointer"
}, null, -1)
  , G = {
    key: 1,
    class: "text-danger"
}
  , j = y({
    __name: "SvgModel",
    props: {
        lastProcessState: {
            type: String,
            required: !1
        }
    },
    setup(p) {
        const d = p
          , e = f()
          , {svgSource: l} = t(e)
          , {activeSingleTicketTier: m} = t(e)
          , {singleTicket: u} = t(e)
          , {svgLoading: _} = t(e)
          , {svgSourceError: g} = t(e)
          , v = T()
          , {currentRole: S} = t(v);
        return b(async()=>{
            S.value="Admin";
            m.value !== "t4" && (d.lastProcessState && k.waitingQA.includes(d.lastProcessState) && V.qa.includes(S.value) || (await e.getSVGSource(),
            await x(async()=>{
                if (!l.value)
                    return;
                const r = document.getElementById("cc-svg-holder")
                  , o = new DOMParser().parseFromString(l.value, "image/svg+xml").documentElement;
                o.setAttribute("width", "100%"),
                o.setAttribute("height", "auto"),
                o.setAttribute("padding", "1rem"),
                r && r.appendChild(o)
                  S.value="QA";
            }
            )))
        }
        ),
        (r,h)=>s(u) && s(u).conversion_type ? (n(),
        a("div", B, [s(_) ? (n(),
        a("div", E, P)) : c("", !0), C, s(g) ? (n(),
        a("span", G, w(s(g)), 1)) : c("", !0)])) : c("", !0)
    }
});
export {j as _};
