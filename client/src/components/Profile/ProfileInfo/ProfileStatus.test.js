import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

//describe - объединяет несколько тестов в один
describe("ProfileStatus component", () => {
    test("status from props should be in state", () => {
        //create - фейково рендерит компоненту
        const component = create(<ProfileStatus status='MyStatus' />);
        // getInstance - берем экземпляр ProfileStatus, т.е. его копию
        const instance = component.getInstance();
        expect(instance.state.status).toBe("MyStatus");
    });
    test("after creation <input> shouldn`t be displayed", () => {
        const component = create(<ProfileStatus status='MyStatus' />);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow()
    });
    test("after creation <span> with status should be displayed", () => {
        const component = create(<ProfileStatus status='MyStatus' />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull(); //toBe - jest documentation
    });
    test("<input> should be displayed in editMode instead of <span>", () => {
        const component = create(<ProfileStatus status='MyStatus' />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick()
        let input = root.findByType("input");
        expect(input.props.value).toBe('MyStatus'); //toBe - jest documentation
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn() // fake spy function
        const component = create(<ProfileStatus status='MyStatus' updataStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode()
        //mock.calls.length - сколько раз вызывается фейковая ф-я
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});

// link: https://www.valentinog.com/blog/testing-react/