import styled from "styled-components";
import { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Map, List } from "immutable";
import { useStateValue, store } from "../../../../state/store";
import { http } from "../../../../util/fetch-builder";
import { Budget } from "../../../../models/budget";
import { Toast } from "../../../../util/toast";
import { SetActiveBudgetCreator } from "../../../../state/actions";
import { Button, ColorType } from "../button";
import { Select } from "../input";
import { useLocalStorage } from "../../../../util/use-local-storage";

export const Header = () => {
    const currentUser = useStateValue((state) => state.currentUser);
    const history = useHistory();
    const { dispatch } = useContext(store);
    const [storedActiveBudgetId, setStoredActiveBudgetId] = useLocalStorage("activeBudgetId");
    const activeBudget = useStateValue(state => state.activeBudget);

    const [budgets, setBudgets] = useState<Map<string, Budget>>(Map());

    const fetchBudgets = useCallback(async () => {
        try {
            const data = await http<Budget[]>("/api/budgets");
            const budgets = List(data.parsedBody?.map(budget => new Budget(budget)) ?? [])
                .toMap()
                .mapKeys((_, budget) => budget.id ?? "")
                .toMap();
            setBudgets(budgets);
        } catch (ex) {
            Toast.error("Failed to fetch budgets");
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            fetchBudgets();
        }
    }, [fetchBudgets, currentUser]);

    useEffect(() => {
        if (activeBudget?.id && !budgets.keySeq().contains(activeBudget.id)) {
            setBudgets(budgets.set(activeBudget.id, activeBudget));
        }
    }, [activeBudget, budgets]);

    useEffect(() => {
        if (!activeBudget && storedActiveBudgetId) {
            dispatch(SetActiveBudgetCreator(budgets.get(storedActiveBudgetId)));
        }
        if (activeBudget && storedActiveBudgetId !== activeBudget.id) {
            setStoredActiveBudgetId(activeBudget.id);
        }
    }, [activeBudget, storedActiveBudgetId, budgets, dispatch, setStoredActiveBudgetId]);

    const onLoginClick = useCallback(() => {
        history.push("/login");
    }, [history]);

    const onLogoutClick = useCallback(() => {
        //
    }, []);

    const onBudgetSelectorChanged = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBudget = budgets.get(e.target.value);
        dispatch(SetActiveBudgetCreator(selectedBudget));
    }, [budgets, dispatch]);

    return (
        <StyledHeader>
            <Title>Budget Creator</Title>
            <Select
                width={200}
                value={activeBudget?.id ?? ""}
                onChange={onBudgetSelectorChanged}
            >
                <option value="" key="">Select a Budget</option>
                {budgets
                    .map(budget => (<option value={budget.id} key={budget.id}>{budget.title}</option>))
                    .valueSeq()
                    .toArray()}
            </Select>
            <div id="buttons-container" style={{display: "flex", flexDirection: "row-reverse"}}></div>
            <Username>{currentUser?.fullName ?? "Please Log In"}</Username>
            <Button
                id="loginLogoutButton"
                text={currentUser ? "Log Out" : "Log In"}
                height={40}
                width={100}
                gridArea="button"
                colorType={ColorType.Secondary}
                onClick={currentUser ? onLogoutClick : onLoginClick}
            />
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    display: grid;
    grid-template-rows: 60px;
    grid-template-columns: auto auto 1fr 150px auto;
    grid-column-gap: 20px;
    grid-template-areas: "title budget-selector . user button";
    align-items: center;
    padding: 0 20px;

    background: #42ABBE;
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
