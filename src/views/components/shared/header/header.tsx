import styled from "styled-components";
import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, ColorType } from "../button";
import { Select } from "../input";
import { useMapDispatch, useMapState } from "../../../../state/hooks";
import { getCurrentUser } from "../../../../state/session/session-selectors";
import { getBudgets } from "../../../../state/data/budget/budget-selectors";
import { getActiveBudget } from "../../../../state/control/budget/budget-selectors";
import { fetchAllBudgets } from "../../../../state/data/budget/budget-slice";
import { setActiveBudget } from "../../../../state/control/budget/budget-slice";

export const Header = () => {
    const history = useHistory();

    const appState = useMapState(state => ({
        activeBudget: getActiveBudget(state),
        currentUser: getCurrentUser(state),
        budgets: getBudgets(state),
    }));

    const dispatch = useMapDispatch({
        fetchAllBudgets,
        setActiveBudget,
    });

    useEffect(() => {
        if (appState.currentUser) {
            dispatch.fetchAllBudgets();
        }
    }, [dispatch, appState.currentUser]);


    const onLoginClick = useCallback(() => {
        history.push("/login");
    }, [history]);

    const onLogoutClick = useCallback(() => {
        //
    }, []);

    const onBudgetSelectorChanged = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBudget = appState.budgets.get(e.target.value);
        dispatch.setActiveBudget(selectedBudget?.id);
    }, [appState.budgets, dispatch]);

    return (
        <StyledHeader>
            <Title>Budget Creator</Title>
            <Select
                width={200}
                value={appState.activeBudget?.id ?? ""}
                onChange={onBudgetSelectorChanged}
            >
                <option value="" key="">Select a Budget</option>
                {appState.budgets
                    .map(budget => (<option value={budget.id} key={budget.id}>{budget.title}</option>))
                    .valueSeq()
                    .toArray()}
            </Select>
            <div id="buttons-container" style={{display: "flex", flexDirection: "row-reverse"}}></div>
            <Username>{appState.currentUser?.fullName ?? "Please Log In"}</Username>
            <Button
                id="loginLogoutButton"
                text={appState.currentUser ? "Log Out" : "Log In"}
                height={40}
                width={100}
                gridArea="button"
                colorType={ColorType.Secondary}
                onClick={appState.currentUser ? onLogoutClick : onLoginClick}
            />
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    display: grid;
    grid-template-columns: auto auto 1fr 150px auto;
    grid-column-gap: 20px;
    grid-template-areas: "title budget-selector . user button";
    align-items: center;
    padding: 0 20px;

    background: rgb(185, 23, 23);
`;

const Title = styled.h1`
    grid-area: title;
    color: white;
    font-weight: 1;
    padding-right: 15px;
    border-right: 1px solid white;
`;

const Username = styled.span`
    grid-area: user;
    color: white;
    text-align: center;
    border-right: 1px solid white;
    border-left: 1px solid white;
`;
