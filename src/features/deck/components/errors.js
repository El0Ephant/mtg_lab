import m from "mithril";

export default class Errors {
    view(vnode) {

        const errors = vnode.attrs.errors;
        return errors.length > 0
            ?
            <>
                {errors.map(
                    (error) => <h4>{error}</h4>
                )}
            </>
            :
            <>
            </>
    }
}